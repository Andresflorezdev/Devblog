import { ref } from 'vue'
import { PostRepository } from '@/repositories/PostRepository'

export function usePosts() {
  const posts      = ref([])
  const featured   = ref(null)
  const loading    = ref(false)
  const error      = ref(null)

  async function fetchAll() {
    loading.value = true
    error.value   = null
    try {
      posts.value    = await PostRepository.getAll()
      featured.value = await PostRepository.getFeatured()
    } catch (e) {
      error.value = 'No se pudieron cargar los posts.'
    } finally {
      loading.value = false
    }
  }

  async function fetchByCategory(slug) {
    loading.value = true
    error.value   = null
    try {
      posts.value = await PostRepository.getByCategory(slug)
    } catch (e) {
      error.value = 'Error al filtrar por categoría.'
    } finally {
      loading.value = false
    }
  }

  return { posts, featured, loading, error, fetchAll, fetchByCategory }
}