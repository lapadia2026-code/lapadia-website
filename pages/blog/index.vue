<template>
  <div class="bg-[#F9F6F0] min-h-screen font-sans">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-emerald-900 text-white" style="background-image: url('/_nuxt/assets/img/blog-hero.jpg'); background-size: cover; background-position: center;">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="max-w-6xl mx-auto px-6 py-20 md:py-28 relative z-10 text-center">
        <!-- We remove the text since the generated image has text baked into it, or we can keep it for SEO but hide it, or just use the image as a decorative background and keep the text. The user requested: "generate an image there at the background please withthe text overlay on it please". Since the image has the text baked in, we can make the text visually hidden or remove it. Actually, a good practice is to keep it visually hidden for screen readers. -->
        <h1 class="sr-only">The Lapadia Blog</h1>
        <p class="sr-only">Health tips, smoothie recipes, wellness stories, and everything fresh — straight from our blenders to your feed.</p>
        <!-- Adding some padding to ensure the hero section has height -->
        <div class="h-48 md:h-64"></div>
      </div>
    </div>

    <!-- Blog Grid -->
    <div class="max-w-6xl mx-auto px-6 py-16">
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="animate-pulse">
          <div class="aspect-[4/3] bg-slate-200 rounded-2xl mb-4"></div>
          <div class="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
          <div class="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>

      <div v-else-if="blogs.length === 0" class="text-center py-24">
        <div class="text-6xl mb-4">📝</div>
        <h2 class="text-3xl font-black text-slate-900 mb-3" style="font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;">Coming Soon</h2>
        <p class="text-slate-500 font-medium max-w-md mx-auto">We're brewing up some amazing content. Check back soon for health tips, recipes, and stories from our kitchen.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink 
          v-for="blog in blogs" 
          :key="blog._id" 
          :to="`/blog/${blog.slug}`"
          class="group cursor-pointer"
        >
          <div class="aspect-[4/3] bg-slate-200 rounded-2xl overflow-hidden mb-5 border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-300">
            <img 
              v-if="blog.coverImage" 
              :src="blog.coverImage" 
              :alt="blog.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div v-else class="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center">
              <span class="text-5xl">🍹</span>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2 mb-3">
            <span v-for="tag in (blog.tags || []).slice(0, 2)" :key="tag" class="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
              {{ tag }}
            </span>
            <span class="text-xs text-slate-400 font-medium">
              {{ formatDate(blog.createdAt) }}
            </span>
          </div>

          <h2 class="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2" style="font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;">
            {{ blog.title }}
          </h2>

          <p class="text-slate-500 font-medium text-sm line-clamp-2">
            {{ stripHtml(blog.content) }}
          </p>

          <div class="flex items-center gap-2 mt-4">
            <div class="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
              {{ (blog.authorName || 'L')[0] }}
            </div>
            <span class="text-sm font-semibold text-slate-600">{{ blog.authorName || 'Lapadia Team' }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';

const blogs = ref<any[]>([]);
const loading = ref(true);

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').substring(0, 160);
};

onMounted(async () => {
  try {
    const res = await GATEWAY_ENDPOINT.get('/blogs?publishedOnly=true');
    blogs.value = res.data;
  } catch (error) {
    console.error('Failed to fetch blogs', error);
  } finally {
    loading.value = false;
  }
});
</script>
