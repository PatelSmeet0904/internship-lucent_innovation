CREATE INDEX product_title ON products (title);

CREATE INDEX variant_title ON variants (title); 
CREATE INDEX variant_product_id ON variants (product_id);  

CREATE INDEX option_product_id ON options (product_id);

CREATE INDEX image_product_id ON images (product_id);
CREATE UNIQUE INDEX image_unique ON images (src, alt);
-- DROP INDEX variant_unique ON images; 

show indexes from products;
show indexes from variants;
show indexes from options;
show indexes from images;  