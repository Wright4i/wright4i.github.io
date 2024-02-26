import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import Icons from 'unplugin-icons/vite';
import rpgleLang from './src/syntaxes/rpgle.tmLanguage.json';
import clLang from './src/syntaxes/cl.tmLanguage.json';

// https://astro.build/config
export default defineConfig({
	site: 'https://wright4i.github.io',
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'Wright4i',
			logo: {
				src: './public/logo.png',
				replacesTitle: true,
			},
			favicon: './logo.png',
			social: {
				github: 'https://github.com/Wright4i',
				linkedin: 'https://linkedin.com/in/Wright4i',
				youtube: 'https://youtube.com/@Wright4i',
				'x.com': 'https://x.com/Wright4i',
			},
			editLink: {
				baseUrl: 'https://github.com/wright4i/wright4i.github.io/edit/main/',
			},
			customCss: [
				'./src/styles/custom.css',
			],
			sidebar: [
				{
					label: 'Guides',
					badge: {
						text: 'New',
						variant: 'success'
					},
					items: [
						{ label: 'RPG', autogenerate: { directory: '/guides/rpg/' } },
						{ label: 'Python', autogenerate: { directory: '/guides/py/' } },
						{ label: 'Node', autogenerate: { directory: '/guides/node/' } },
						{ label: 'Web Frontend', autogenerate: { directory: '/guides/web/' } },
						{ label: 'More', autogenerate: { directory: '/guides/more/' } },
					],
					collapsed: false,
				},
				{
					label: 'Presentations',
					autogenerate: { directory: '/presentations/' },
					collapsed: true,
				},
				{
					label: 'Blog',
					autogenerate: { directory: '/blog/' },
					collapsed: true,
				},
				{
					label: 'Resources',
					autogenerate: { directory: '/resources/'},
					collapsed: true,
				},
				{
					label: 'About me',
					link: '/about/', 
					badge: {
						text: 'Contact me!',
						variant: 'tip'
					},
				},
			],
		}),
	],
	markdown: {
		shikiConfig: {
			langs: [
				rpgleLang,
				clLang,
				'sql',
			]
		}
	},
	vite: {
		plugins: [
			Icons({
				compiler: 'astro',
			}),
		],
	}
});