<template>
  <div class="bg-[#F9F6F0] min-h-screen font-sans">
    <!-- Loading State -->
    <div v-if="loading" class="max-w-3xl mx-auto px-6 py-20 animate-pulse">
      <div class="h-10 bg-slate-200 rounded w-3/4 mb-6"></div>
      <div class="h-6 bg-slate-200 rounded w-1/3 mb-12"></div>
      <div class="aspect-video bg-slate-200 rounded-2xl mb-12"></div>
      <div class="space-y-4">
        <div class="h-4 bg-slate-200 rounded w-full"></div>
        <div class="h-4 bg-slate-200 rounded w-5/6"></div>
        <div class="h-4 bg-slate-200 rounded w-4/6"></div>
      </div>
    </div>

    <!-- Article -->
    <article v-else-if="blog" class="pb-24">
      <!-- Cover Image -->
      <div v-if="blog.coverImage" class="w-full max-h-[500px] overflow-hidden">
        <img :src="blog.coverImage" :alt="blog.title" class="w-full h-full object-cover" />
      </div>

      <div class="max-w-3xl mx-auto px-6 pt-12">
        <!-- Back link -->
        <NuxtLink to="/blog" class="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-2 w-fit transition-colors mb-8">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Blog
        </NuxtLink>

        <!-- Tags -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <span v-for="tag in (blog.tags || [])" :key="tag" class="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
            {{ tag }}
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]" >
          {{ blog.title }}
        </h1>

        <!-- Meta -->
        <div class="flex items-center gap-4 mb-12 pb-8 border-b border-slate-200">
          <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
            {{ (blog.authorName || 'L')[0] }}
          </div>
          <div>
            <div class="font-bold text-slate-900">{{ blog.authorName || 'Lapadia Team' }}</div>
            <div class="text-sm text-slate-500 font-medium">{{ formatDate(blog.createdAt) }}</div>
          </div>
        </div>

        <!-- Content (rendered HTML from TipTap) -->
        <div class="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-emerald-700 prose-img:rounded-2xl prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50/50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg" v-html="blog.content"></div>
      </div>
    </article>

    <!-- Not Found -->
    <div v-else class="text-center py-24 max-w-3xl mx-auto px-6">
      <h2 class="text-xl md:text-3xl font-black text-slate-900 mb-4" >Post Not Found</h2>
      <p class="text-slate-500 mb-8 font-medium">This blog post might have been removed or doesn't exist.</p>
      <NuxtLink to="/blog" class="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-colors">Return to Blog</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';

const route = useRoute();
const blog = ref<any>(null);
const loading = ref(true);

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

onMounted(async () => {
  try {
    const res = await GATEWAY_ENDPOINT.get(`/blogs/${route.params.slug}`);
    blog.value = res.data;
    
    // Create an excerpt from content
    let excerpt = blog.value.excerpt;
    if (!excerpt && blog.value.content) {
      const stripped = blog.value.content.replace(/<[^>]+>/g, '');
      excerpt = stripped.substring(0, 160) + '...';
    }

    useSeoMeta({
      title: `${blog.value.title} - Lapadia Blog`,
      description: excerpt || 'Read the latest from Lapadia Fresh',
      ogTitle: `${blog.value.title} - Lapadia Blog`,
      ogDescription: excerpt || 'Read the latest from Lapadia Fresh',
      ogImage: blog.value.coverImage || 'https://lapadia.org/images/logo.jpg',
      twitterTitle: `${blog.value.title} - Lapadia Blog`,
      twitterDescription: excerpt || 'Read the latest from Lapadia Fresh',
      twitterImage: blog.value.coverImage || 'https://lapadia.org/images/logo.jpg'
    });
  } catch (error) {
    console.error('Failed to fetch blog', error);
  } finally {
    loading.value = false;
  }
});
</script>
