import { config, fields, collection } from '@keystatic/core';
import { GITHUB_REPO, SITE_PROPIETARIO } from './src/consts';
const isProd = import.meta.env.PROD;

export default config({
// Aqui cambiale dependiendo de tu usuario y la repo, si no, no te deja accerder, revisa consts.ts
    storage: isProd 
    ? {
        kind: 'github',
        repo: GITHUB_REPO, 
      }
    : {
        kind: 'local',
      },
    collections: {
// --- COLECCIÓN DE PRODUCTOS ---
        productos: collection({
            label: 'Productos',
            slugField: 'nombre', // El nombre del archivo se generará a partir del nombre del producto
            path: 'src/content/productos/*',
            format: { contentField: 'content' }, // Separa el frontmatter del contenido Markdown
            schema: {
                nombre: fields.slug({ name: { label: 'Nombre del Producto' } }),
                descripcion: fields.text({ label: 'Descripción corta', multiline: true }),
                precio: fields.number({ label: 'Precio original ($)' }),
                precioDescuento: fields.number({ label: 'Precio de oferta (Dejar vacío si no aplica)' }),
                promocion: fields.select({
                    label: 'Promoción especial (2x1, 3x2)',
                    description: 'Selecciona si el producto tiene una promoción por cantidad',
                    options: [
                        { label: 'Ninguna', value: 'ninguna' },
                        { label: '2x1 (Lleva 2, paga 1)', value: '2x1' },
                        { label: '3x2 (Lleva 3, paga 2)', value: '3x2' },
                    ],
                    defaultValue: 'ninguna',
                }),
                categorias: fields.array(
                    fields.text({ label: 'Categoría' }),
                    { label: 'Categorías', itemLabel: props => props.value }
                ),
                subcategorias: fields.array(
                    fields.text({ label: 'Subcategoría' }),
                    { label: 'Subcategorías', itemLabel: props => props.value }
                ),
// Keystatic guardará las imágenes directamente en tu carpeta de assets
                imagenPrincipal: fields.image({
                    label: 'Imagen Principal',
                    directory: 'src/assets/productos',
                    publicPath: '../../assets/productos/'
                }),
                imagenesSecundarias: fields.array(
                    fields.image({
                    label: 'Imagen',
                    directory: 'src/assets/productos',
                    publicPath: '../../assets/productos/'
                }),
                { label: 'Galería Secundaria (Máximo 5 fotos)' }
                ),
                disponibilidad: fields.checkbox({ label: '¿Hay stock disponible?', defaultValue: true }),
                destacado: fields.checkbox({ label: '¿Mostrar en el Hero de la portada?', defaultValue: false }),
        // Este es el campo grande de texto donde el cliente puede escribir el detalle usando negritas, listas, etc.
                content: fields.mdx({
                    label: 'Detalles completos del producto',
                    options: {
                        image: {
                            directory: 'src/assets/productos',
                            publicPath: '../../assets/productos/'
                        }
                    }
                }),
            },
        }),
// --- COLECCIÓN DEL BLOG ---
        blog: collection({
            label: 'Avisos y Blog',
            slugField: 'title',
            path: 'src/content/avisos/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Título del artículo' } }),
                seoTitle: fields.text({ label: 'Título SEO (Opcional - para Google)' }),
                description: fields.text({ label: 'Resumen (Descripción para tarjetas)', multiline: true }),
                pubDate: fields.date({ label: 'Fecha de publicación' }),

                updatedDate: fields.date({ label: 'Fecha de actualización (Opcional)' }),
                heroImage: fields.image({
                    label: 'Imagen de Portada',
                    directory: 'src/assets/blog',
                    publicPath: '../../assets/blog/'
                }),
            
                author: fields.text({ label: 'Autor', defaultValue: SITE_PROPIETARIO }),
                categoria: fields.text({ label: 'Categoría' }),
            
                tags: fields.array(
                    fields.text({ label: 'Etiqueta' }),
                    { label: 'Etiquetas', itemLabel: props => props.value }
                ),
            
                draft: fields.checkbox({ label: 'Borrador (Ocultar al público)', defaultValue: false }),
                destacado: fields.checkbox({ label: '¿Fijar en portada del blog?', defaultValue: false }),
                tiempoLectura: fields.number({ label: 'Tiempo estimado de lectura (minutos)' }),

                content: fields.mdx({
                    label: 'Contenido del artículo',
                    options: {
                        image: {
                            directory: 'src/assets/blog',
                            publicPath: '../../assets/blog/'
                        }
                    }
                }),
            },
        }),
    },
});