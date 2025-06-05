const filter_getProductsIdQuery = `
    SELECT 
	    id
    FROM
    (
        SELECT 
            cv."productId" as id,
            (CASE
                WHEN props.searchtype = 'number' AND cv."numValue" IS NOT NULL THEN
                    (CASE
                        WHEN props.searchminvalue <= cv."numValue" 
                            AND props.searchmaxvalue >= cv."numValue"
                        THEN 1
                        ELSE 0
                    END)
                WHEN props.searchtype = 'string' AND cv."textValue" IS NOT NULL THEN
                    (CASE
                        WHEN cv."textValue" LIKE '%' || props.searchtextvalue || '%'
                        THEN 1
                        ELSE 0
                    END)
                WHEN props.searchtype = 'option' AND cv."textValue" IS NOT NULL THEN
                    (CASE
                        WHEN cv."textValue" = ANY(string_to_array(props.searchtextvalue, ','))
                        THEN 1
                        ELSE 0
                    END)
                ELSE 0
            END) isvalid
        FROM (
            SELECT 
                ct.code as searchtype,
                searchfilter.code as searchcode,
                searchfilter.inputvalue as searchtextvalue,
                (CASE
                    WHEN ct.code = 'number' THEN
                        TO_NUMBER(split_part(searchfilter.inputvalue, '-', 1), '99G999D9S')
                    ELSE -1
                END) searchminvalue,
                (CASE
                    WHEN ct.code = 'number' THEN
                        TO_NUMBER(split_part(searchfilter.inputvalue, '-', 2), '99G999D9S')
                    ELSE -1
                END) searchmaxvalue,
                pi.id as itemid
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
                        AND fi."productTypeId" = :productTypeId
            LEFT JOIN product_char_items pi ON pi."filterItemId" = fi.id
            LEFT JOIN char_item_types ct ON pi."charItemTypeId" = ct.id
        ) props
        LEFT JOIN char_values cv ON cv."productCharItemId" = props.itemid
    )
    GROUP BY id
    HAVING MIN(isvalid) = 1
`;


const filter_getProductsQuery = `
     SELECT 
        prd.uuid as id,
        prd.name as name,
        prd.price as price,
        prd.img as img,
        prd.rating as rating,
        prd.description as description,
        sl.id as salerid,
        sl.name as salername,
        sl.rating as salerrating
    FROM products prd
    LEFT JOIN salers sl ON prd."salerId"=sl.id
    WHERE prd.id = ANY(${filter_getProductsIdQuery})
    LIMIT :limit OFFSET :offset
`;

const filter_getProductsCountQuery = `
    SELECT COUNT(*) as count FROM (${filter_getProductsIdQuery})
`;

module.exports = {
    filter_getProductsQuery,
    filter_getProductsCountQuery
}