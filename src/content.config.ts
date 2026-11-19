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
			description: z.string(),
			pubDate: z.coerce.date(),
// LO OPCIONAL (Aquí existe lo que no ocupamos, pero que debería curbrir casi todas las necesidades)
// Fechas y Estado
			updatedDate: z.coerce.date().optional(),
			draft: z.boolean().default(false), // Ocultar borradores al público
			destacado: z.boolean().default(false), // Fijar en portada del blog
			tiempoLectura: z.number().nullable().optional(), // Tiempo estimado de lectura (minutos)

// Multimedia
			heroImage: z.optional(image()), // Imagen ancha de cabecera
			thumbnail: z.optional(image()), // Imagen cuadrada para la tarjeta (si no hay, usas heroImage)
			videoUrl: z.string().url().optional(), // Por si quieren clavar un video de YouTube

// Taxonomía (Filtros)
			categoria: z.string().optional(),
			categories: z.array(z.string()).optional(),
			tags: z.array(z.string()).default([]),

// Autoría (Por si el cliente pone a 3 personas distintas a escribir)
			author: z.string().default(SITE_PROPIETARIO),
			authorRole: z.string().optional(),
			authorImage: z.optional(image()),

// SEO
			seoTitle: z.string().optional(),
			metaTitle: z.string().max(70).optional(), // Título optimizado solo para Google
			metaDescription: z.string().max(160).optional(),
			canonicalURL: z.string().url().optional(), // Para evitar contenido duplicado

// Control de Interfaz
			showToc: z.boolean().default(true), // ¿Mostrar tabla de contenidos?
			relatedPosts: z.array(z.string()).optional(), // Slugs de otros posts para "Te podría interesar"
		}),
});
// Valores para los productos
const productos = defineCollection({
	loader: glob({ base: './src/content/productos', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			nombre: z.string(),
			descripcion: z.string(),
			precio: z.number(),
			precioDescuento: z.number().nullable().optional(), // <-- Propiedad opcional (soporta vacío en Keystatic)
			categorias: z.array(z.string()),
			subcategorias: z.array(z.string()).optional(),
			imagenPrincipal: image(),
// Validamos que sea un arreglo de imágenes con un máximo de 5
			imagenesSecundarias: z.array(image()).max(5).optional(),
			disponibilidad: z.boolean().default(true),
			destacado: z.boolean().default(false),
		}),
});

// Exportamos ambas colecciones
export const collections = { blog, productos };