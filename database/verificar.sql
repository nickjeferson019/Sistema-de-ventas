-- Ejecutar conectado a sistema_ventas.
SELECT table_name, column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('productos', 'vendedor', 'ventas')
ORDER BY table_name, ordinal_position;

SELECT tc.table_name, kcu.column_name,
       ccu.table_name AS tabla_referenciada,
       ccu.column_name AS columna_referenciada
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
 AND tc.constraint_schema = kcu.constraint_schema
JOIN information_schema.constraint_column_usage ccu
  ON ccu.constraint_name = tc.constraint_name
 AND ccu.constraint_schema = tc.constraint_schema
WHERE tc.table_schema = 'public'
  AND tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name IN ('productos', 'vendedor', 'ventas');

SELECT COUNT(*) AS total_productos FROM productos;
SELECT COUNT(*) AS total_vendedores FROM vendedor;
SELECT COUNT(*) AS total_ventas FROM ventas;
