import { defineStore } from 'pinia';
import { PostRepository } from '@/repositories/PostRepository';

export const usePostStore = defineStore('posts', {
    state: () => ({
        posts: [],
        featured: null,
        loading: false,
        error: null
    }),

    getters: {
        totalPost: (state) => state.posts.length,
        byCategory: (state) => (slug) =>
            state.posts.filter(p => p.category === slug)
    },

    actions: {
        async loadPosts() {
            this.loading = true
            this.error = null
            try {
                this.posts = await PostRepository.getAll()
                this.featured = await PostRepository.getFeatured()
            } catch {
                this.error = 'Error cargando post'
            } finally {
                this.loading = false
            }
        }
    }
})