import { defineConfig, type DefaultTheme } from 'vitepress'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadSidebar(project: string): DefaultTheme.SidebarItem[] {
  const path = resolve(__dirname, `../${project}/sidebar.json`)
  if (!existsSync(path)) return []
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as DefaultTheme.SidebarItem[]
  } catch (e) {
    console.warn(`[sidebar] failed to parse ${path}:`, e)
    return []
  }
}

const projects = [
  // { slug: 'shopify', label: 'Shopify' },
  // { slug: 'magento2', label: 'Magento 2' },
  // { slug: 'odoo-erp', label: 'Odoo ERP' },
  // { slug: 'bigcommerce', label: 'BigCommerce' },
  // { slug: 'shopware6', label: 'Shopware 6' },
  // { slug: 'woocommerce', label: 'WooCommerce' },
  // { slug: 'bagisto', label: 'Bagisto' },
  // { slug: 'cs-cart', label: 'CS-Cart' },
  // { slug: 'prestashop', label: 'PrestaShop' },
  // { slug: 'icecat', label: 'Icecat' },
  // { slug: 'xml-connector', label: 'XML Connector' },
  // { slug: 'aws-integration', label: 'AWS Integration' },
  { slug: 'ai-product-feed-openai', label: 'AI Product Feed (OpenAI)' },
  // { slug: 'job-scheduler', label: 'Job Scheduler' },
  { slug: 'supplier-data-portal', label: 'Supplier Data Portal' },
  // { slug: 'public-image-url', label: 'Public Image URL' },
  { slug: 'maker-checker-workflow', label: 'Maker Checker Workflow' },
  // { slug: 'pdf-generator', label: 'PDF Generator' },
  // { slug: 'dam', label: 'DAM' },
  // { slug: 'dam-webdav', label: 'DAM NextCloud' },
  // { slug: 'starter-pack', label: 'Starter Pack' },
  { slug: 'auto-sku-generator', label: 'Auto SKU Generator' },
  { slug: 'deepl', label: 'DeepL Translator' },
  { slug: 'cloudflare-r2-integration', label: 'Cloudflare R2 Integration' },
  { slug: 'version-history-restore', label: 'Version History Restore' }
] as const

export default defineConfig({
  lang: 'en-US',
  title: 'Unopim Extensions',
  description: 'Documentation for Unopim extensions and connectors',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    siteTitle: false,
    logo: {
      light: '/logo.svg',
      dark: '/dark_logo.svg',
    },
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Extensions',
        items: projects.map(p => ({ text: p.label, link: `/${p.slug}/` })),
      },
      { text: 'User Guide', link: 'https://docs.unopim.com/' },
      { text: 'Contact Us', link: 'https://unopim.com/en/contacts/' },
    ],
    sidebar: Object.fromEntries(
      projects.map(p => [`/${p.slug}/`, loadSidebar(p.slug)])
    ),
    editLink: {
      pattern: 'https://github.com/unopim/docs-extensions/edit/main/docs/:path',
      text: 'Help us improve this page on Github.',
    },
    lastUpdated: {
      text: 'Last Updated',
      formatOptions: { dateStyle: 'full' },
    },
    outline: { level: 'deep' },
    footer: {
      message: 'Released under the <a href="https://opensource.org/licenses/mit" target="_blank">MIT License</a>.',
      copyright: `Copyright © ${new Date().getFullYear()} UnoPim`,
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/unopim' },
    ],
    search: {
      provider: 'local',
    },
  },
})
