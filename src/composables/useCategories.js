import { ref } from 'vue';
import { CategoryRepository } from '@/repositories/CategoryRepository';

export function useCategories() {
    const categories = ref([])
    const loading = ref(false)

    async function fetchAll() {
        loading.value = true
        try {
            categories.value = await CategoryRepository.getAll()
        } finally {
            loading.value = false
        }
    }

    return { categories, loading, fetchAll }
}