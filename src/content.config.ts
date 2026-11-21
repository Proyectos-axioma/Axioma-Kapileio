import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SITE_PROPIETARIO } from './consts';

// Helpers a prueba de fallos cuando Keystatic guarda null, strings vacíos o entradas vacías
const textoSeguro = (porDefecto = '') =>
	z.preprocess((val) => (typeof val === 'string' && val.trim() !== '' ? val : porDefecto), z.string());

const textoOpcional = z
	.preprocess((val) => (typeof val === 'string' && val.trim() !== '' ? val.trim() : undefined), z.string().optional());

const numeroSeguro = (porDefecto = 0) =>
	z.preprocess((val) => (typeof val === 'number' && !Number.isNaN(val) ? val : porDefecto), z.number());

const numeroOpcional = z
	.preprocess((val) => (typeof val === 'number' && !Number.isNaN(val) ? val : undefined), z.number().optional());

const booleanoSeguro = (porDefecto = false) =>
	z.preprocess((val) => (typeof val === 'boolean' ? val : porDefecto), z.boolean());

const fechaSegura = z.preprocess((val) => {
	if (!val) return new Date();
	const d = new Date(val as string | number | Date);
	return Number.isNaN(d.getTime()) ? new Date() : d;
}, z.date());

const fechaOpcional = z.preprocess((val) => {
	if (!val) return undefined;
	const d = new Date(val as string | number | Date);
	return Number.isNaN(d.getTime()) ? undefined : d;
}, z.date().optional());

const blog = defineCollection({
	loader: glob({ base: './src/content/avisos', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
// LO OBLIGATORIO (Con respaldo automático para que nunca explote aunque lo dejen vacío)
			title: textoSeguro('Aviso sin título'),
			description: textoSeguro(''),
			pubDate: fechaSegura,
// LO OPCIONAL (Aquí existe lo que no ocupamos, pero que debería cubrir casi todas las necesidades)
// Fechas y Estado
			updatedDate: fechaOpcional,
			draft: booleanoSeguro(false), // Ocultar borradores al público
			destacado: booleanoSeguro(false), // Fijar en portada del blog
			tiempoLectura: numeroOpcional, // Tiempo estimado de lectura (minutos)

// Multimedia
			heroImage: z
				.preprocess((val) => (val && typeof val === 'string' && val.trim() !== '' ? val : undefined), image().optional()), // Imagen ancha de cabecera
			thumbnail: z
				.preprocess((val) => (val && typeof val === 'string' && val.trim() !== '' ? val : undefined), image().optional()), // Imagen cuadrada para la tarjeta (si no hay, usas heroImage)
			videoUrl: textoOpcional, // Por si quieren clavar un video de YouTube

// Taxonomía (Filtros)
			categoria: textoOpcional,
			categories: z
				.preprocess((val) => (Array.isArray(val) ? val : []), z.array(z.string().nullable()))
				.transform((arr) => arr.filter((c): c is string => Boolean(c && c.trim()))),
			tags: z
				.preprocess((val) => (Array.isArray(val) ? val : []), z.array(z.string().nullable()))
				.transform((arr) => arr.filter((t): t is string => Boolean(t && t.trim()))),

// Autoría (Por si el cliente pone a 3 personas distintas a escribir)
			author: textoSeguro(SITE_PROPIETARIO),
			authorRole: textoOpcional,
			authorImage: z
				.preprocess((val) => (val && typeof val === 'string' && val.trim() !== '' ? val : undefined), image().optional()),

// SEO
			seoTitle: textoOpcional,
			metaTitle: textoOpcional, // Título optimizado solo para Google
			metaDescription: textoOpcional,
			canonicalURL: textoOpcional, // Para evitar contenido duplicado

// Control de Interfaz
			showToc: booleanoSeguro(true), // ¿Mostrar tabla de contenidos?
			relatedPosts: z
				.preprocess((val) => (Array.isArray(val) ? val : []), z.array(z.string().nullable()))
				.transform((arr) => arr.filter((p): p is string => Boolean(p && p.trim()))), // Slugs de otros posts para "Te podría interesar"
		}),
});

// Valores para los productos
const productos = defineCollection({
	loader: glob({ base: './src/content/productos', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			nombre: textoSeguro('Producto sin nombre'),
			descripcion: textoSeguro(''),
			precio: numeroSeguro(0),
			precioDescuento: numeroOpcional, // <-- Propiedad opcional (soporta vacío en Keystatic)
			promocion: z.preprocess(
				(val) => (val === '2x1' || val === '3x2' ? val : 'ninguna'),
				z.enum(['ninguna', '2x1', '3x2'])
			),
			categorias: z
				.preprocess((val) => (Array.isArray(val) ? val : ['General']), z.array(z.string().nullable()))
				.transform((arr) => {
					const limpias = arr.filter((c): c is string => Boolean(c && c.trim()));
					return limpias.length > 0 ? limpias : ['General'];
				}),
			subcategorias: z
				.preprocess((val) => (Array.isArray(val) ? val : []), z.array(z.string().nullable()))
				.transform((arr) => arr.filter((c): c is string => Boolean(c && c.trim()))),
			imagenPrincipal: z
				.preprocess((val) => (val && typeof val === 'string' && val.trim() !== '' ? val : '../../assets/productos/Placeholder.svg'), image()),
// Validamos que sea un arreglo de imágenes con un máximo de 5 (filtrando nulos/vacíos y recortando si el usuario subió de más)
			imagenesSecundarias: z
				.preprocess(
					(val) =>
						Array.isArray(val)
							? val.filter((img) => typeof img === 'string' && img.trim() !== '').slice(0, 5)
							: [],
					z.array(image())
				),
			disponibilidad: booleanoSeguro(true),
			destacado: booleanoSeguro(false),
		}),
});

// Exportamos ambas colecciones
export const collections = { blog, productos };
