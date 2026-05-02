import posts from '@/data/posts.json'

export const PostRepository = {
    getAll() {
        return Promise.resolve([...posts])
    },

    getFeatured() {
        return Promise.resolve(posts.find(p => p.featured)?? null)
    },

    getBySlug(slug) {
        return Promise.resolve(posts.find(p => p.slug === slug)?? null)
    },

    getByCategory(categorySlug) {
        return Promise.resolve(posts.filter(p => p.category === categorySlug))
    },
    getRecent(limit = 5) {
        return Promise.resolve([...posts].slice(0, limit))
    }
}