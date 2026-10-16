# AGENTS.md — Nintendo Game Gallery

## 1. Visión general del proyecto

Aplicación web para explorar una galería de videojuegos de Nintendo, buscar títulos por nombre, consultar información y descripciones individuales, y mantener una colección personal en el apartado **Mis juegos**.

El objetivo es crear una experiencia web rápida, intuitiva y visualmente cuidada, con personalidad propia y una estética clásica inspirada en la historia de los videojuegos. No debe parecer una plantilla genérica ni una interfaz producida en serie por una IA.

### 1.1. Stack tecnológico

- **Editor y agente de desarrollo:** OpenCode.
- **Frontend:** React.
- **Herramienta de desarrollo y compilación:** Vite.
- **Estilos:** Tailwind CSS.
- **Lenguaje recomendado:** TypeScript con configuración estricta.
- **Gestión de estado:** React hooks y Context cuando realmente se necesite compartir estado.
- **Persistencia inicial:** `localStorage` para guardar la lista personal y las preferencias del usuario.
- **Enrutamiento:** React Router si la navegación necesita rutas independientes; no introducirlo si una solución más sencilla cubre el alcance inicial.
- **Iconos:** una biblioteca coherente como Lucide React. No usar emojis como sustitutos de iconos de interfaz.
- **Pruebas:** Vitest 5 + React Testing Library + jsdom, ya configuradas (`npm run test`, `npm run test:watch`). Los archivos `*.test.ts(x)` viven junto al código que prueban.
- **Gestor de paquetes:** respetar el que ya use el repositorio (`npm`, `pnpm`, `yarn` o `bun`). Si el proyecto está vacío, utilizar npm por defecto.

No incorporar backend, base de datos, autenticación, servicios de pago ni infraestructura externa en la primera versión. La aplicación debe funcionar como frontend independiente. Si una futura funcionalidad necesita un servicio externo, explicar primero la dependencia y diseñar una integración opcional.

### 1.2. Convenciones de idioma

- **Código, variables, funciones, componentes, tipos, archivos y commits:** inglés.
- **Interfaz visible, textos, títulos, formularios, filtros, notificaciones, estados vacíos y mensajes de error:** español.
- **Documentación del proyecto:** español, salvo que una herramienta o dependencia requiera otro idioma.
- Mantener una terminología consistente. El nombre visible de la sección personal será **Mis juegos**.

### 1.3. Principios del producto

1. La galería debe ser fácil de explorar incluso para alguien que no conozca todos los títulos.
2. Cada videojuego debe contar con una ficha y una descripción propias; no se deben repetir textos genéricos entre juegos.
3. La búsqueda debe encontrar títulos por nombre y actualizar los resultados sin recargar la página.
4. **Mis juegos** debe permitir añadir y quitar títulos de una colección personal, y conservarla al recargar o volver a abrir el navegador.
5. El diseño debe priorizar legibilidad, jerarquía visual, navegación clara y buen rendimiento.
6. Las funciones principales deben funcionar sin crear una cuenta.
7. Los datos de ejemplo deben estar claramente estructurados para que sea sencillo ampliar la galería.
8. No afirmar que existe una conexión a una API o una base de datos si no se ha implementado y verificado.

---

## 0. Flujo de trabajo del agente — Leer antes de trabajar

Este archivo es la fuente principal de instrucciones del proyecto. Antes de realizar cambios, OpenCode debe leerlo y revisar la estructura y las convenciones que ya existen en el repositorio.

### 0.1. Antes de modificar código

1. Revisar el árbol de archivos, `package.json`, la configuración de Vite, Tailwind CSS y TypeScript.
2. Leer los componentes, estilos, utilidades y datos existentes relacionados con la tarea.
3. Identificar qué comportamiento debe mantenerse y qué archivos necesitan cambiar.
4. Preferir modificaciones pequeñas, coherentes y reutilizables antes que reescribir archivos completos.
5. Si el proyecto ya contiene una solución funcional, no sustituirla por otra tecnología sin una razón concreta.
6. Si faltan datos menores de diseño, tomar una decisión razonable que respete este documento y continuar.
7. Preguntar al usuario solo cuando falte una decisión imprescindible, haya riesgo de pérdida de datos o existan alternativas incompatibles con consecuencias importantes.

### 0.2. Git y entrega de cambios

- No trabajar directamente sobre `main` si el repositorio ya utiliza ramas de desarrollo.
- Si existe una rama de integración (`dev`), crear una rama descriptiva desde ella cuando el estado del repositorio lo permita.
- No crear ramas a ciegas si el repositorio todavía no está inicializado o tiene una estrategia diferente.
- No descartar cambios del usuario, sobrescribir trabajo ajeno ni ejecutar `git reset --hard`, `git clean -fd`, `push --force` u operaciones destructivas sin autorización explícita.
- No asumir que existe un remoto, permisos de escritura o una rama `dev`.
- **No hacer commit, push, merge ni desplegar automáticamente.** Hacerlo únicamente si el usuario lo solicita o si las reglas explícitas del entorno de trabajo autorizado así lo requieren.
- Antes de un commit solicitado, revisar `git diff` y preparar un commit enfocado en un solo cambio lógico.
- Mensajes de commit en inglés, siguiendo Conventional Commits; por ejemplo, `feat(gallery): add game search`.

### 0.3. Validación obligatoria

Antes de considerar terminado un cambio:

1. Ejecutar las comprobaciones disponibles para el proyecto.
2. Ejecutar el linter si está configurado.
3. Ejecutar las pruebas relacionadas si existen.
4. Ejecutar `npm run build` o el comando equivalente del gestor de paquetes utilizado.
5. Resolver los errores introducidos por el cambio.
6. Si una comprobación no puede ejecutarse por una dependencia, una limitación del entorno o un problema previo, indicarlo con claridad. No afirmar que la compilación o las pruebas pasaron si no se ejecutaron.

Comandos de referencia cuando el proyecto utiliza npm:

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
```

Los comandos `lint` y `test` solo deben utilizarse si están definidos en `package.json`. No agregar scripts ficticios ni declarar que existe una herramienta que no está instalada.

### 0.4. Mantener el documento actualizado

Actualizar `AGENTS.md` cuando cambien de manera permanente la arquitectura, los comandos, las convenciones, el sistema de datos o las reglas de desarrollo. No convertirlo en un registro de cada cambio pequeño.

---

## 2. Rol de OpenCode

OpenCode actúa como desarrollador frontend responsable de implementar, mantener y mejorar la aplicación siguiendo este documento.

### 2.1. Responsabilidades

- Comprender el código antes de editarlo.
- Diseñar componentes reutilizables sin crear abstracciones innecesarias.
- Mantener consistentes el diseño, la tipografía, los espacios y los estados interactivos.
- Asegurar que las funciones principales trabajen realmente, no solo que parezcan funcionales.
- Crear datos de videojuegos coherentes y fichas con contenido específico.
- Implementar estados de carga, ausencia de resultados, errores y listas vacías cuando sean pertinentes.
- Evitar dependencias nuevas si una solución sencilla con el stack actual es suficiente.
- Explicar brevemente qué cambió, qué validó y qué quedó pendiente al terminar una tarea.

### 2.2. Autonomía y límites

La IA puede proponer y añadir mejoras pequeñas que refuercen el producto, por ejemplo, filtros por plataforma, ordenamiento, favoritos, etiquetas de género o una vista de detalles.

Toda función adicional debe cumplir estas condiciones:

- Aporta utilidad real a la galería.
- No desplaza ni rompe la búsqueda o **Mis juegos**.
- Mantiene una interfaz simple.
- No requiere credenciales, pagos ni servicios innecesarios.
- No agrega complejidad desproporcionada al MVP.
- No presenta como guardados en la nube los datos que solo existen en el navegador.

No implementar compras, descargas de ROM, emulación, cuentas de usuario, sincronización remota ni servicios con costes como si formaran parte del alcance inicial.

---

## 3. Identidad visual y experiencia de usuario

### 3.1. Dirección de diseño

La interfaz debe evocar una colección de videojuegos cuidada, una tienda retro o una revista clásica de videojuegos, sin copiar directamente una página oficial existente.

La estética debe sentirse diseñada por una persona: jerarquía clara, decisiones tipográficas intencionales, detalles gráficos moderados y espacios bien resueltos.

**Dirección visual recomendada:**

- Fondo cálido claro, crema o gris suave, combinado con texto oscuro.
- Un color de acento inspirado en la cultura Nintendo, como rojo, utilizado con moderación.
- Un segundo color auxiliar solo cuando mejore la comprensión visual.
- Tipografía de interfaz legible; reservar fuentes de carácter retro para títulos o pequeños detalles, no para todos los párrafos.
- Bordes definidos y radios moderados. Evitar que todas las tarjetas parezcan cápsulas.
- Sombras discretas, separadores y estados hover claros.
- Portadas de juegos como elemento visual principal.
- Composición editorial con tamaños y pesos variados cuando ayude a destacar el contenido.
- Iconos consistentes y con propósito.
- Animaciones breves y discretas, respetando `prefers-reduced-motion`.

Evitar:

- Gradientes morados/azules usados por defecto.
- Brillos, efectos glassmorphism o neones sin una razón visual.
- Tarjetas idénticas repetidas sin jerarquía.
- Exceso de bordes redondeados, sombras y elementos flotantes.
- Grandes titulares genéricos que no aporten información.
- Emojis en lugar de recursos gráficos de interfaz.
- Portadas falsas que se presenten como oficiales.
- Textos de relleno, descripciones repetidas y botones decorativos que no funcionen.

### 3.2. Estructura de la página

La composición base debe incluir:

1. **Encabezado:** nombre o identidad de la galería, navegación principal y acceso a Mis juegos.
2. **Presentación breve:** título editorial y una frase que explique la colección, sin ocupar demasiado espacio.
3. **Búsqueda principal:** campo visible y fácil de usar para buscar por nombre.
4. **Filtros y ordenamiento:** opcionales en la primera iteración, pero recomendados cuando ya exista una cantidad suficiente de títulos.
5. **Galería:** cuadrícula adaptable de portadas con nombre, plataforma o saga cuando esté disponible y acceso a los detalles.
6. **Ficha del videojuego:** descripción propia, datos relevantes y acción para añadir o quitar de Mis juegos.
7. **Apartado Mis juegos:** colección personal con controles para quitar juegos, ordenar y volver a sus fichas.
8. **Pie de página:** información breve sobre el proyecto y, cuando corresponda, atribución de recursos externos.

No es obligatorio mostrar todos los apartados en una sola pantalla. La navegación debe permitir acceder a ellos sin confusión.

### 3.3. Diseño adaptable

- Diseñar primero para móviles y ampliar progresivamente a tabletas y escritorio.
- Evitar desbordamientos horizontales.
- La cuadrícula debe adaptar sus columnas al ancho disponible.
- Los controles táctiles deben tener un tamaño cómodo.
- El buscador y los botones principales deben seguir siendo fáciles de utilizar en pantallas pequeñas.
- Mantener las imágenes con proporciones consistentes y usar `object-fit` de acuerdo con el recurso.
- Verificar los estados de navegación, búsqueda, detalles y Mis juegos en distintos anchos.

### 3.4. Accesibilidad

- Utilizar HTML semántico: `header`, `nav`, `main`, `section`, `article` y `footer` cuando corresponda.
- Cada imagen significativa debe tener texto alternativo apropiado.
- Todos los controles deben poder utilizarse con teclado.
- Mostrar un indicador de foco visible.
- Asociar etiquetas a los campos de formulario.
- No comunicar estados únicamente mediante colores.
- Mantener contraste suficiente entre texto y fondo.
- Usar `aria-label` solo cuando un control no tenga un nombre accesible visible adecuado.
- Las ventanas de detalles, si se implementan como diálogos, deben gestionar el foco, cerrarse con Escape y contar con un nombre accesible.
- Respetar las preferencias de movimiento reducido.

---

## 4. Funcionalidades del producto

### 4.1. Galería de videojuegos

La página principal presenta una colección de videojuegos de Nintendo en tarjetas visuales.

Cada tarjeta puede incluir:

- Portada.
- Nombre del juego.
- Plataforma o familia de consola.
- Género principal, si se conoce.
- Indicador de que el título está en Mis juegos.
- Acción para abrir su ficha.

Reglas:

- Cada título debe tener un identificador estable y único.
- No usar el nombre visible como único identificador si puede haber ediciones o títulos similares.
- No duplicar un juego por un error de renderizado.
- Mantener la información de la tarjeta sincronizada con la ficha de detalles.
- Si una portada no está disponible, mostrar un recurso alternativo visual coherente, sin romper la composición.
- No presentar imágenes provisionales como portadas oficiales.

### 4.2. Búsqueda por nombre

La búsqueda debe ser una funcionalidad central y verificable.

Requisitos:

- Filtrar por el nombre del juego mientras el usuario escribe.
- No distinguir entre mayúsculas y minúsculas.
- Ignorar espacios sobrantes al principio y al final.
- Manejar correctamente las búsquedas vacías.
- Mostrar un mensaje claro cuando no haya coincidencias.
- Ofrecer una forma sencilla de borrar la búsqueda.
- Actualizar los resultados sin recargar la página.
- Conservar el acceso a la ficha del juego desde los resultados.

Se recomienda normalizar el texto para mejorar las coincidencias y, cuando sea razonable, permitir búsquedas sin diferencias por acentos. Por ejemplo, una búsqueda de `pokemon` debería poder encontrar `Pokémon`.

La búsqueda debe aplicarse al conjunto de títulos de la galería. Si hay filtros activos, estos deben combinarse de forma predecible y el usuario debe poder limpiarlos.

### 4.3. Ficha y descripción individual

**Todo juego publicado en la galería debe tener una descripción específica.** No se debe reutilizar una descripción genérica para completar datos faltantes.

Modelo de información recomendado:

- `id`: identificador estable.
- `slug`: identificador legible para rutas, si se usan.
- `title`: nombre del juego.
- `description`: descripción principal propia del juego.
- `shortDescription`: resumen opcional para tarjetas.
- `platforms`: plataformas en las que se publicó o que corresponden a la edición descrita.
- `releaseYear`: año de lanzamiento, cuando se haya verificado.
- `genres`: géneros relevantes.
- `coverImage`: ruta o URL de la portada.
- `developer`: desarrollador, si se conoce.
- `publisher`: distribuidor, si se conoce.
- `series`: saga, si corresponde.
- `isFeatured`: indicador opcional para destacar el juego.

Los campos opcionales deben poder faltar sin causar errores. No inventar fechas, estudios, plataformas ni otros datos para rellenar fichas. Si no se conoce un dato, omitirlo o mostrar una indicación apropiada.

La ficha debe mostrar, como mínimo, nombre, portada cuando esté disponible y descripción. Puede incluir plataforma, año, género y una acción de colección personal.

### 4.4. Mis juegos

Es una colección personal de títulos que el usuario desea guardar.

Funciones obligatorias:

- Añadir un juego desde la galería o su ficha.
- Quitar un juego de la colección.
- Evitar que un mismo juego se añada varias veces.
- Mostrar claramente qué juegos ya están guardados.
- Mantener la colección al recargar la página y al cerrar y volver a abrir el navegador.
- Mostrar un estado vacío útil con una invitación a explorar la galería.
- Permitir abrir la ficha de cualquier título guardado.
- Mantener la colección sincronizada con la galería durante la sesión.

Persistencia:

- Utilizar `localStorage` en la primera versión.
- Guardar preferentemente una lista de IDs estables, no copias completas de las fichas.
- Leer los datos de forma defensiva: manejar JSON inválido, claves ausentes y versiones antiguas sin bloquear la aplicación.
- Encapsular el acceso al almacenamiento en una utilidad o hook reutilizable.
- Actualizar el estado de React cuando se añadan o quiten juegos; no depender solo de modificar `localStorage`.
- Si se detectan cambios de almacenamiento en otra pestaña, sincronizar la colección cuando sea posible.
- Si el almacenamiento no está disponible, mantener la aplicación utilizable durante la sesión y comunicar el problema solo cuando afecte al usuario.
- Informar de que la lista se guarda en este navegador y no se sincroniza automáticamente con otros dispositivos.

La colección debe tolerar que un ID guardado ya no exista en los datos disponibles: ignorarlo de forma segura o permitir limpiar la entrada obsoleta.

### 4.5. Funciones adicionales permitidas

La IA puede implementar, de forma progresiva:

- Filtros por consola, género o saga.
- Orden por nombre o año cuando los datos sean fiables.
- Sección de juegos destacados.
- Favoritos o etiquetas personales, siempre que no confundan el concepto de Mis juegos.
- Indicador de cantidad de juegos guardados.
- Botón para limpiar filtros.
- Página o panel de detalles.
- Mensajes de confirmación discretos para acciones importantes.
- Estado de carga y tratamiento de imágenes que no se puedan cargar.
- Tema oscuro opcional si puede añadirse sin perjudicar el diseño principal.
- Exportar o importar la colección en JSON, como mejora posterior y con validación del archivo.

No añadir todas estas funciones de una sola vez. Priorizar primero la galería, la búsqueda, las fichas y la persistencia.

---

## 5. Arquitectura del frontend

### 5.1. Organización recomendada

Adaptar la estructura a la configuración real del proyecto. Como punto de partida:

```text
src/
├── app/
│   ├── App.tsx
│   └── routes.tsx
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   └── MainLayout.tsx
│   ├── games/
│   │   ├── GameCard.tsx
│   │   ├── GameGrid.tsx
│   │   ├── GameDetails.tsx
│   │   ├── GameSearch.tsx
│   │   ├── GameFilters.tsx
│   │   └── CollectionButton.tsx
│   └── ui/
│       ├── EmptyState.tsx
│       ├── LoadingState.tsx
│       └── ErrorState.tsx
├── data/
│   └── games.ts
├── hooks/
│   ├── useGameSearch.ts
│   └── useMyGames.ts
├── lib/
│   ├── storage.ts
│   └── normalizeSearch.ts
├── pages/
│   ├── GalleryPage.tsx
│   ├── MyGamesPage.tsx
│   └── NotFoundPage.tsx
├── types/
│   └── game.ts
├── styles/
│   └── index.css
└── main.tsx
```

Esta estructura es una guía, no una obligación de crear todos los archivos desde el primer día. No generar archivos vacíos ni componentes que no tengan una responsabilidad real. Si el proyecto no necesita rutas separadas, mantener una arquitectura más sencilla.

### 5.2. Responsabilidades

- **Pages:** organizan el contenido de cada vista y conectan los componentes.
- **Components:** muestran la interfaz y encapsulan interacciones visuales.
- **Data:** mantiene los datos iniciales de los videojuegos.
- **Hooks:** encapsulan estado reutilizable, búsqueda y colección personal.
- **Lib:** agrupa funciones puras y utilidades de persistencia.
- **Types:** define contratos y tipos compartidos.
- **Styles:** contiene estilos globales, variables y directivas necesarias de Tailwind.

### 5.3. Gestión del estado

- Usar `useState` para estados locales simples.
- Usar `useMemo` únicamente cuando ayude a evitar cálculos repetidos relevantes o a expresar derivaciones complejas con claridad.
- Usar `useEffect` para sincronizaciones externas, como almacenamiento o eventos; no para recalcular innecesariamente valores derivados.
- Evitar duplicar en el estado los resultados de búsqueda que pueden calcularse a partir del catálogo y la consulta.
- Evitar Context para valores que solo necesita un componente o dos componentes cercanos.
- No incorporar Redux, Zustand u otra librería de estado global sin una necesidad demostrable.
- Mantener una única fuente de verdad para los datos del catálogo y los IDs de Mis juegos.

### 5.4. Decisiones de implementación registradas

- **Tailwind CSS v4** se integra mediante el plugin oficial `@tailwindcss/vite`; los tokens de color y tipografía viven en `src/styles/index.css` dentro de `@theme`.
- **Navegación:** el MVP usa estado interno de React (`MainView`) en lugar de React Router; si más adelante se necesitan URLs profundas o el comportamiento del botón Atrás, se incorporará React Router.
- **Portadas:** el catálogo inicial no usa imágenes externas. `GameCover` renderiza una composición gráfica original basada en el género cuando falta `coverImage` o cuando una URL externa falla (`onError`). Si en el futuro se añaden portadas reales, debe comprobarse su procedencia y disponibilidad.
- **Lint:** ESLint 10 con flat config, `typescript-eslint` y `eslint-plugin-react-hooks` (reglas de React Compiler incluidas en `recommended-latest`).
- **Búsqueda:** `normalizeSearchText` (`src/lib/normalizeSearch.ts`) pasa a minúsculas, recorta y colapsa espacios y elimina diacríticos; `useGameSearch` filtra el catálogo por `title` y `series` sin recargar la página.
- **Mis juegos:** `useMyGames` (`src/hooks/useMyGames.ts`) es la única fuente de verdad de la colección y vive en `App`. Los IDs estables se guardan en `localStorage` con la clave `galeria-nintendo:my-games:v1` a través de `src/lib/storage.ts`, que valida el JSON, deduplica entradas y degrada a modo solo sesión si el almacenamiento no está disponible. Los cambios de otras pestañas se aplican con el evento `storage`.
- **Filtros y orden:** `applyGameFilters` y `sortGames` (`src/lib/filterGames.ts`) se aplican después de la búsqueda. El orden por título usa `Intl.Collator('es')` y el por año deja los títulos sin `releaseYear` al final. La interfaz vive en `GameFilters` con selects nativos etiquetados y un botón «Limpiar filtros»; la búsqueda y los filtros se limpian juntos cuando no hay coincidencias.
- **Pruebas:** la configuración está en `vitest.config.ts` (entorno jsdom, `pool: 'vmThreads'`) con el setup en `src/test/setup.ts`. Hay pruebas de las utilidades (`normalizeSearch`, `storage`, `filterGames`), de los hooks (`useGameSearch`, `useMyGames`), de las páginas (`GalleryPage`, `MyGamesPage`) y de un flujo de integración en `App` que valida guardado, navegación y persistencia tras recargar el árbol.

---

## 6. Modelo de datos y reglas de dominio

### 6.1. Tipo principal `Game`

Ejemplo orientativo en TypeScript:

```ts
export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;
  platforms: string[];
  releaseYear?: number;
  genres: string[];
  coverImage?: string;
  developer?: string;
  publisher?: string;
  series?: string;
  isFeatured?: boolean;
}
```

Ajustar el tipo a las necesidades reales. Los campos que no se utilicen no deben añadirse solo para aparentar complejidad.

### 6.2. Reglas de integridad

1. Cada `Game.id` debe ser único y estable.
2. `title` y `description` deben contener texto útil.
3. La descripción debe explicar el juego concreto: su propuesta, mundo, mecánica o premisa, según la información fiable disponible.
4. `platforms` y `genres` deben usar valores consistentes.
5. `releaseYear` debe ser un número válido cuando exista.
6. Las rutas de imágenes deben tratarse como recursos que pueden faltar o fallar.
7. Las fichas deben poder renderizarse aunque falten datos opcionales.
8. Las operaciones sobre Mis juegos deben usar IDs estables.
9. La búsqueda debe consultar `title` y puede incluir `series` cuando esa conducta se defina de forma coherente.
10. No mezclar títulos, ediciones, plataformas o fechas cuando la información disponible no permita identificarlos correctamente.

### 6.3. Catálogo inicial

- Incluir un conjunto inicial representativo de videojuegos de distintas sagas y generaciones de Nintendo.
- Priorizar datos bien organizados y descripciones originales, breves y específicas.
- Cubrir más de una saga, plataforma o género para que los filtros y la galería tengan utilidad.
- Mantener el catálogo en un archivo de datos o fuente de datos claramente delimitada.
- No mezclar los datos del catálogo con la lógica de los componentes.
- No inventar una API oficial ni depender de un servicio no configurado.
- Si se utiliza una API externa en el futuro, aislar las llamadas en una capa de datos y definir qué ocurre cuando el servicio falla.
- No afirmar que un juego está disponible para una consola específica sin comprobar la edición o el contexto correspondiente.

---

## 7. Reglas de implementación con React, Vite y Tailwind CSS

### 7.1. React y TypeScript

- Usar componentes funcionales y hooks.
- Definir tipos explícitos para props, modelos y funciones públicas.
- Evitar `any`; preferir tipos concretos, `unknown` con validación o un tipo discriminado cuando corresponda.
- No ignorar errores de TypeScript para ocultar problemas reales.
- Usar `key` estables al renderizar listas.
- No usar índices de array como claves cuando los elementos tienen IDs estables.
- Evitar componentes excesivamente grandes. Separarlos por responsabilidad, no por cantidad arbitraria de líneas.
- No introducir `useEffect` para lógica que pueda resolverse directamente durante el renderizado.
- No mutar arrays u objetos del estado directamente.
- Manejar correctamente los valores opcionales.

### 7.2. Vite

- Mantener los scripts de `package.json` correctos y coherentes con la configuración existente.
- Utilizar variables de entorno de Vite solo para configuración pública del frontend.
- Recordar que las variables con prefijo `VITE_` se exponen al código del navegador; nunca guardar contraseñas, tokens privados ni secretos en ellas.
- Evitar configurar proxies o servicios que el proyecto no necesita.
- No modificar la configuración de compilación sin motivo concreto.
- Mantener la aplicación ejecutable mediante el flujo normal de Vite.

### 7.3. Tailwind CSS

- Verificar la versión instalada antes de escribir configuración.
- Respetar las convenciones de la versión real de Tailwind CSS: no asumir que todas las versiones utilizan el mismo archivo de configuración o las mismas directivas.
- Utilizar clases utilitarias para el diseño habitual.
- Centralizar los colores, fuentes y tokens de diseño importantes cuando sea apropiado.
- Evitar cadenas de clases excesivamente complejas y duplicadas; extraer componentes o pequeñas utilidades cuando aporten claridad.
- No mezclar estilos inline con utilidades sin una razón concreta.
- Usar CSS propio para casos específicos que resulten más claros o accesibles que una combinación de utilidades.
- No instalar otra biblioteca de componentes visuales sin comprobar primero si es necesaria.

### 7.4. Calidad de código

- Mantener nombres descriptivos y consistentes.
- Extraer funciones puras para la normalización de búsqueda, filtrado y validación.
- No duplicar la misma lógica en la tarjeta, la ficha y la página de Mis juegos.
- Eliminar imports y código muerto introducidos por el cambio.
- No añadir comentarios que repitan literalmente lo que el código ya expresa.
- Comentar las decisiones de negocio o técnicas que no resulten evidentes.
- No dejar botones sin comportamiento ni enlaces con destinos ficticios.
- No utilizar datos de ejemplo como si fueran datos reales verificados.

---

## 8. Imágenes, contenido y propiedad intelectual

### 8.1. Portadas e imágenes

Las portadas son importantes para la identidad visual, pero su procedencia y disponibilidad deben tratarse de manera responsable.

- Preferir recursos autorizados, de uso permitido o proporcionados por el usuario.
- Si se usan URLs externas, comprobar que sean recursos válidos y manejar fallos de carga.
- No asumir que una URL seguirá disponible para siempre.
- Evitar descargar y redistribuir imágenes protegidas sin autorización.
- No crear logos falsos ni presentar ilustraciones generadas como arte oficial.
- Mantener una alternativa visual cuando no exista una portada.
- Definir texto alternativo útil; si la portada es decorativa y el nombre del juego ya está junto a ella, evitar texto alternativo redundante.
- No hacer que la carga de imágenes impida utilizar la búsqueda o abrir una ficha.

### 8.2. Descripciones

- Escribir descripciones originales, concisas y distintas para cada título.
- Parafrasear la información; no copiar extensamente textos promocionales de terceros.
- No inventar características, personajes, modos de juego, fechas o plataformas.
- Distinguir la descripción general del juego de los metadatos opcionales.
- Si no se dispone de información fiable para una ficha, señalar la limitación y evitar rellenarla con afirmaciones no verificadas.

### 8.3. Identidad del proyecto

El nombre y los elementos visuales de la aplicación no deben inducir a pensar que es una web oficial de Nintendo. Se puede describir como una galería personal o un proyecto independiente dedicado a videojuegos de Nintendo.

---

## 9. Rendimiento y experiencia

- Mantener el catálogo inicial como datos locales si su tamaño lo permite.
- Evitar solicitudes de red innecesarias.
- Evitar re-renderizados y cálculos costosos sin una razón medible.
- Usar carga diferida de imágenes cuando sea útil y compatible con el diseño.
- Reservar el espacio de las imágenes para reducir saltos de contenido.
- Mantener el buscador fluido mientras se escribe.
- No instalar librerías grandes para resolver problemas sencillos.
- Proporcionar estados vacíos y mensajes comprensibles en lugar de pantallas en blanco.
- Verificar que los errores de una imagen o del almacenamiento no bloqueen el resto de la página.
- Mantener una navegación consistente y un comportamiento predecible del botón Atrás si se implementan rutas.

---

## 10. Seguridad y privacidad

Aunque la primera versión no requiera servidor ni cuentas, deben mantenerse buenas prácticas:

- No almacenar secretos en el frontend.
- No usar `dangerouslySetInnerHTML` para mostrar descripciones o datos del catálogo.
- Tratar cualquier contenido importado por el usuario como dato no confiable.
- Validar el formato de los datos antes de importarlos o guardarlos.
- Manejar de forma segura los errores al leer y escribir en `localStorage`.
- No recopilar ni enviar información personal sin una función explícita y justificada.
- No añadir analítica, seguimiento ni cookies no necesarias por defecto.
- No afirmar que `localStorage` ofrece sincronización o una copia de seguridad remota.
- Si en el futuro se incorpora un backend, definir por separado autenticación, autorización, validación y almacenamiento seguro; no simular controles de seguridad solo en el cliente.

---

## 11. Pruebas y criterios de aceptación

La aplicación no se considera completa solo porque compile. Deben comprobarse los comportamientos principales.

### 11.1. Galería

- Se muestran varios juegos con nombres legibles.
- Cada juego abre su propia ficha.
- Las descripciones son específicas y no se reutiliza una misma descripción genérica.
- Una imagen rota no rompe la tarjeta ni el resto de la página.
- La interfaz responde correctamente en móvil y escritorio.

### 11.2. Búsqueda

- Buscar por el nombre completo devuelve el juego esperado.
- Buscar por una parte del nombre devuelve coincidencias.
- Las mayúsculas y minúsculas no alteran la búsqueda.
- Los espacios sobrantes no provocan resultados incorrectos.
- Las búsquedas con o sin acentos funcionan según la normalización implementada.
- Una consulta sin coincidencias muestra un estado vacío útil.
- Borrar la consulta permite recuperar el catálogo.
- La búsqueda no recarga la página.

### 11.3. Mis juegos

- Añadir un juego lo incorpora a la colección.
- Intentar añadirlo otra vez no crea duplicados.
- Quitar un juego lo elimina de la colección.
- El estado de la tarjeta y el de la ficha se actualizan de forma coherente.
- Recargar la página conserva los juegos guardados.
- Una colección vacía muestra un mensaje y una forma de volver a explorar.
- Un ID guardado que ya no exista no provoca un error fatal.
- La interfaz explica que la persistencia es local al navegador.

### 11.4. Calidad técnica

- No hay errores de TypeScript introducidos por el cambio.
- No hay errores de consola que afecten al funcionamiento principal.
- Los controles interactivos funcionan con teclado.
- El diseño conserva una jerarquía visual clara en varios tamaños de pantalla.
- El build de producción termina correctamente.
- Las pruebas automatizadas existentes continúan pasando.

---

## 12. Plan de desarrollo por sprints

### Sprint 0 — Revisión y configuración

**Objetivo:** preparar una base estable sin añadir complejidad innecesaria.

- Inspeccionar el repositorio y las dependencias existentes.
- Confirmar la configuración real de React, Vite, TypeScript y Tailwind CSS.
- Verificar que los comandos de desarrollo y build funcionen.
- Definir los tokens básicos de diseño y estilos globales.
- Establecer el tipo `Game` y la estructura inicial de datos.
- Confirmar el idioma español de la interfaz.

**Criterio de salida:** la aplicación arranca y compila con la configuración documentada.

### Sprint 1 — Galería visual

**Objetivo:** mostrar un catálogo inicial de videojuegos.

- Crear el encabezado y la navegación principal.
- Diseñar la presentación de la galería.
- Crear `GameCard` y `GameGrid`.
- Preparar un catálogo inicial con IDs estables y descripciones individuales.
- Añadir tratamiento para portadas ausentes o fallidas.
- Adaptar la cuadrícula a móviles, tabletas y escritorio.

**Criterio de salida:** el usuario puede explorar los juegos y abrir sus fichas sin errores.

### Sprint 2 — Búsqueda y fichas

**Objetivo:** encontrar títulos rápidamente y consultar su información.

- Crear el buscador controlado por React.
- Implementar normalización de texto.
- Filtrar el catálogo sin recargar la página.
- Mostrar el estado sin resultados y la opción de limpiar la búsqueda.
- Crear la ficha de detalles de cada juego.
- Añadir datos opcionales solo cuando sean fiables.
- Verificar que cada juego muestre su propia descripción.

**Criterio de salida:** la búsqueda y las fichas cumplen todos los criterios funcionales de la sección 11.

### Sprint 3 — Mis juegos y persistencia

**Objetivo:** permitir que cada usuario construya su colección personal.

- Crear `useMyGames` o una abstracción equivalente.
- Implementar lectura y escritura seguras de `localStorage`.
- Añadir y quitar títulos sin duplicados.
- Sincronizar los botones y los indicadores de colección.
- Crear la página o sección Mis juegos.
- Implementar estado vacío y acceso a las fichas.
- Comprobar persistencia después de recargar.

**Criterio de salida:** la colección se mantiene en el navegador y todas las acciones funcionan.

### Sprint 4 — Pulido visual y accesibilidad

**Objetivo:** mejorar la calidad percibida y la facilidad de uso.

- Revisar tipografía, jerarquía, espaciado, colores y consistencia.
- Eliminar elementos decorativos que no aporten valor.
- Verificar foco, navegación por teclado, etiquetas y contraste.
- Ajustar las vistas para diferentes anchos.
- Mejorar el tratamiento de errores y estados vacíos.
- Revisar tiempos de carga y comportamiento de imágenes.

**Criterio de salida:** la interfaz se siente coherente, legible, accesible y no genérica.

### Sprint 5 — Pruebas y mejoras opcionales

**Objetivo:** estabilizar el MVP antes de ampliar funcionalidades.

- Añadir pruebas de búsqueda y de la colección personal.
- Ejecutar las validaciones de producción.
- Corregir defectos encontrados.
- Evaluar filtros por plataforma o género.
- Añadir ordenamiento u otras mejoras solo si aportan utilidad clara.
- Actualizar la documentación con las funciones que realmente se implementaron.

**Criterio de salida:** las funciones principales están validadas y las mejoras opcionales no degradan el MVP.

---

## 13. Definición de terminado

Una tarea se considera terminada cuando:

1. Cumple el objetivo solicitado.
2. Sigue la arquitectura y las convenciones del proyecto.
3. No rompe la galería, la búsqueda ni Mis juegos.
4. La interfaz visible está en español.
5. No contiene botones falsos, enlaces ficticios ni datos inventados presentados como ciertos.
6. Los estados de carga, error y ausencia de resultados están tratados cuando corresponde.
7. El código está tipado y no introduce complejidad innecesaria.
8. Se han ejecutado las validaciones pertinentes y se han informado sus resultados reales.
9. Se han revisado los cambios para evitar modificaciones no relacionadas.
10. Se ha actualizado la documentación cuando una decisión permanente lo requiere.

Al finalizar cada tarea, OpenCode debe entregar un resumen breve con:

- Qué se implementó.
- Qué archivos o áreas se modificaron.
- Qué pruebas o comandos se ejecutaron y sus resultados.
- Qué limitaciones o tareas pendientes existen, si las hay.

---

## 14. Prioridades del proyecto

Cuando haya que elegir entre varias alternativas, seguir este orden:

1. **Funcionalidad correcta:** búsqueda, fichas y Mis juegos deben funcionar.
2. **Claridad visual:** navegación evidente y diseño con personalidad.
3. **Contenido fiable:** descripciones propias y datos coherentes.
4. **Persistencia segura:** colección local sin duplicados ni pérdida accidental.
5. **Accesibilidad y adaptación:** uso cómodo en distintos dispositivos.
6. **Mantenibilidad:** código legible, tipado y componentes con responsabilidades claras.
7. **Funciones extra:** solo después de estabilizar las anteriores.

La meta no es construir la aplicación más compleja, sino una galería de videojuegos atractiva, clásica, rápida y útil, en la que explorar títulos, conocer cada juego y mantener una colección personal sea sencillo.
