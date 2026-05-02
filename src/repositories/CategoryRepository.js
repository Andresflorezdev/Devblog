import categories from '@/data/categories.json'

export const CategoryRepository = {
    getAll() {
        return Promise.resolve([...categories])
    },

    getBySlug(slug) {
        return Promise.resolve(categories.find(c => c.slug === slug) ?? null)
    }
}