import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SITE_PROPIETARIO } from './consts';

const blog = defineCollection({
	loader: glob({ base: './src/content/avisos', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
// LO OBLIGATORIO (Lo mínimo para que no explote)
			title: z.string(),
			description: z.string().default(''),
			pubDate: z.coerce.date().default(() => new Date()),
// LO OPCIONAL (Aquí existe lo que no ocupamos, pero que debería curbrir casi todas las necesidades)
// Fechas y Estado
			updatedDate: z.coerce.date().nullable().optional(),
			draft: z.boolean().default(false), // Ocultar borradores al público
			destacado: z.boolean().default(false), // Fijar en portada del blog
			tiempoLectura: z.number().nullable().optional(), // Tiempo estimado de lectura (minutos)

// Multimedia
			heroImage: z
				.preprocess((val) => (val && typeof val === 'string' && val.trim() !== '' ? val : undefined), image().optional()), // Imagen ancha de cabecera
			thumbnail: z.optional(image()), // Imagen cuadrada para la tarjeta (si no hay, usas heroImage)
			videoUrl: z.string().url().nullable().optional(), // Por si quieren clavar un video de YouTube

// Taxonomía (Filtros)
			categoria: z.string().nullable().optional(),
			categories: z.array(z.string()).nullable().optional(),
			tags: z
				.array(z.string().nullable())
				.default([])
				.transform((arr) => arr.filter((t): t is string => Boolean(t && t.trim()))),

// Autoría (Por si el cliente pone a 3 personas distintas a escribir)
			author: z.string().default(SITE_PROPIETARIO),
			authorRole: z.string().nullable().optional(),
			authorImage: z.optional(image()),

// SEO
			seoTitle: z.string().nullable().optional(),
			metaTitle: z.string().max(70).nullable().optional(), // Título optimizado solo para Google
			metaDescription: z.string().max(160).nullable().optional(),
			canonicalURL: z.string().url().nullable().optional(), // Para evitar contenido duplicado

// Control de Interfaz
			showToc: z.boolean().default(true), // ¿Mostrar tabla de contenidos?
			relatedPosts: z.array(z.string()).nullable().optional(), // Slugs de otros posts para "Te podría interesar"
		}),
});
// Valores para los productos
const productos = defineCollection({
	loader: glob({ base: './src/content/productos', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			nombre: z.string(),
			descripcion: z.string().default(''),
			precio: z.number().default(0),
			precioDescuento: z.number().nullable().optional(), // <-- Propiedad opcional (soporta vacío en Keystatic)
			promocion: z.enum(['ninguna', '2x1', '3x2']).nullable().optional().default('ninguna'),
			categorias: z
				.array(z.string().nullable())
				.default(['General'])
				.transform((arr) => {
					const limpias = arr.filter((c): c is string => Boolean(c && c.trim()));
					return limpias.length > 0 ? limpias : ['General'];
				}),
			subcategorias: z
				.array(z.string().nullable())
				.nullable()
				.optional()
				.transform((arr) => arr?.filter((c): c is string => Boolean(c && c.trim()))),
			imagenPrincipal: z
				.preprocess((val) => (val && typeof val === 'string' && val.trim() !== '' ? val : '../../assets/productos/Placeholder.svg'), image()),
// Validamos que sea un arreglo de imágenes con un máximo de 5 (filtrando nulos si Keystatic deja entradas vacías)
			imagenesSecundarias: z
				.array(image().nullable())
				.max(5)
				.nullable()
				.optional()
				.transform((arr) => arr?.filter((img): img is NonNullable<typeof img> => img != null)),
			disponibilidad: z.boolean().default(true),
			destacado: z.boolean().default(false),
		}),
});

// Exportamos ambas colecciones
export const collections = { blog, productos };