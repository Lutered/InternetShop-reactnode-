const filter_getProductsIdQuery = `
    SELECT 
        id
    FROM
        (SELECT
            allCharacteristics.productid as id,
            (
                CASE
                    WHEN allCharacteristics.searchtype = 'number' AND cnv.value IS NOT NULL THEN 
                        (CASE
                                WHEN TO_NUMBER(split_part(allCharacteristics.searchvalue, '-', 1), '99G999D9S') <= cnv.value AND
                                    TO_NUMBER(split_part(allCharacteristics.searchvalue, '-', 2), '99G999D9S') >= cnv.value
                                THEN 1
                                ELSE 0
                        END)
                    WHEN allCharacteristics.searchtype = 'string' AND cstv.value IS NOT NULL THEN
                        (CASE
                                WHEN cstv.value LIKE '%' || allCharacteristics.searchvalue || '%'
                                THEN 1
                                ELSE 0
                        END)
                    WHEN allCharacteristics.searchtype = 'option' AND cstv.value IS NOT NULL THEN
                        (CASE
                            WHEN cstv.value = ANY(string_to_array(allCharacteristics.searchvalue, ','))
                            THEN 1 
                            ELSE 0
                        END)
                    ELSE 0
                END
            ) as isvalid
        FROM
            (SELECT 
                pi."productId" as productid,
                pi."valueId" as productvalueid,
                ct.code as searchtype,
                searchfilter.code as searchcode,
                searchfilter.inputvalue as searchvalue
            FROM
                (	
                    SELECT 
						filterCodes.code as code,
						filterValues.filterValue as inputvalue
					FROM 
                        (  
                            SELECT 
                                code,
                                ROW_NUMBER() over (order by true) as rn
                            FROM unnest(string_to_array(:codes, ';')) as code
                        ) filterCodes
					LEFT JOIN 
                        (
                            SELECT
                                filterValue,
                                ROW_NUMBER() over (partition by true) as rn
                            FROM unnest(string_to_array(:values, ';')) as filterValue
                        ) filterValues 
                    ON filterCodes.rn = filterValues.rn
                ) searchfilter
            LEFT JOIN filter_items fi ON fi.code = searchfilter.code 
                AND fi."productTypeId" = (SELECT id FROM product_types WHERE code = :productType)
            LEFT JOIN product_char_items pi ON pi."filterItemId" = fi.id
            LEFT JOIN char_item_types ct ON pi."charItemTypeId" = ct.id) allCharacteristics
        LEFT JOIN char_number_values cnv  ON allCharacteristics.searchtype = 'number' AND cnv.id  = allCharacteristics.productvalueid
        LEFT JOIN char_text_values cstv ON allCharacteristics.searchtype=ANY(ARRAY['string', 'option']) AND cstv.id = allCharacteristics.productvalueid
        LEFT JOIN char_date_values cdv ON allCharacteristics.searchtype = 'date' AND cdv.id = allCharacteristics.productvalueid)
    GROUP BY id
    HAVING MIN(isvalid) = 1
`;


const filter_getProductsQuery = `
     SELECT 
        id,
        name,
        price,
        img,
        rating,
        description
    FROM products
    WHERE id = ANY(${filter_getProductsIdQuery})
    LIMIT :limit OFFSET :offset
`;

const filter_getProductsCountQuery = `
    SELECT COUNT(*) as count FROM (${filter_getProductsIdQuery})
`;
// const createFilterFn = `
//     CREATE OR REPLACE FUNCTION filter_products(productType VARCHAR, filtercodes VARCHAR, filtervalues VARCHAR) 
//     RETURNS TABLE(
//         id      INTEGER,
//         name    VARCHAR,
//         price   NUMERIC,
//         img     VARCHAR,
//         rating  NUMERIC
//     ) AS $$
//         SELECT 
//             id,
//             name,
//             price,
//             img,
//             rating
//         FROM products
//         WHERE id = ANY(SELECT 
//                 id
//             FROM
//             (SELECT
//                     allCharacteristics.productid as id,
//                     (
//                         CASE
//                             WHEN allCharacteristics.searchtype = 'number' AND cnv.value IS NOT NULL THEN 
//                                 (CASE
//                                         WHEN TO_NUMBER(split_part(allCharacteristics.searchvalue, '-', 1), '99G999D9S') >= cnv.value AND
//                                             TO_NUMBER(split_part(allCharacteristics.searchvalue, '-', 2), '99G999D9S') <= cnv.value
//                                         THEN 1
//                                         ELSE 0
//                                 END)
//                             WHEN allCharacteristics.searchtype = 'string' AND cstv.value IS NOT NULL THEN
//                                 (CASE
//                                         WHEN cstv.value LIKE '%' || allCharacteristics.searchvalue || '%'
//                                         THEN 1
//                                         ELSE 0
//                                 END)
//                             WHEN allCharacteristics.searchtype = 'option' AND cstv.value IS NOT NULL THEN
//                                 (CASE
//                                     WHEN cstv.value = ANY(string_to_array(allCharacteristics.searchvalue, ','))
//                                     THEN 1 
//                                     ELSE 0
//                                 END)
//                             ELSE 0
//                         END
//                     ) as isvalid
//             FROM
//                 (SELECT 
//                     pi."productId" as productid,
//                     pi."valueId" as productvalueid,
//                     ct.code as searchtype,
//                     searchfilter.code as searchcode,
//                     searchfilter.inputvalue as searchvalue
//                 FROM
//                     (SELECT code, inputvalue
//                     FROM unnest( string_to_array($2, ';') ) AS code, 
//                         unnest( string_to_array($3, ';') ) AS inputvalue) searchfilter
//                 LEFT JOIN filter_items fi ON fi.code = searchfilter.code 
//                     AND fi."productTypeId" = (SELECT id FROM product_types WHERE code = $1)
//                 LEFT JOIN product_char_items pi ON pi."filterItemId" = fi.id
//                 LEFT JOIN char_item_types ct ON pi."charItemTypeId" = ct.id) allCharacteristics
//             LEFT JOIN char_number_values cnv  ON allCharacteristics.searchtype = 'number' AND cnv.id  = allCharacteristics.productvalueid
//             LEFT JOIN char_text_values cstv ON allCharacteristics.searchtype=ANY(ARRAY['string', 'option']) AND cstv.id = allCharacteristics.productvalueid
//             LEFT JOIN char_date_values cdv ON allCharacteristics.searchtype = 'date' AND cdv.id = allCharacteristics.productvalueid)
//             GROUP BY id
//             HAVING MIN(isvalid) = 1)
//     $$ LANGUAGE SQL;
// `;

module.exports = {
    //createFilterFn
    filter_getProductsQuery,
    filter_getProductsCountQuery
}