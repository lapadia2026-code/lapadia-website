<template>
  <div class="py-6 md:py-10 pb-16 max-w-7xl mx-auto px-5 md:px-8">
    <div class="mb-10">
      <NuxtLink to="/cart" class="text-emerald-600 hover:text-emerald-500 font-bold flex items-center gap-2 w-fit mb-4 transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Cart
      </NuxtLink>
      <h1 class="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Secure Checkout</h1>
      <p class="text-slate-500 mt-2 font-medium">Complete your details below to place your order.</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20 relative">
      <!-- Checkout Form -->
      <form @submit.prevent="handleCheckout" class="lg:col-span-2 space-y-8">
        
        <!-- Login Prompt if Not Authenticated (removed, using modal instead) -->

        <!-- Delivery Details -->
        <section class="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
            <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">1</span>
            Delivery Details
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Full Name</label>
              <input v-model="orderData.fullName" required type="text" class="w-full px-5 md:px-8 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="John Doe" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Email Address</label>
              <input v-model="orderData.email" required type="email" class="w-full px-5 md:px-8 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="john@example.com" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Phone Number <span class="text-rose-500">*</span></label>
              <div class="flex gap-2 relative z-20">
                <CountryCodeSelect v-model="orderData.phoneCode" class="w-32" />
                <input v-model="orderData.phone" required type="tel" class="flex-1 px-5 md:px-8 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="800 000 0000" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Alternative Phone Number <span class="text-slate-400 font-normal">(WhatsApp)</span></label>
              <div class="flex gap-2 relative z-10">
                <CountryCodeSelect v-model="orderData.altPhoneCode" class="w-32" />
                <input v-model="orderData.altPhone" type="tel" class="flex-1 px-5 md:px-8 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="800 000 0000" />
              </div>
            </div>
            <div class="md:col-span-2 space-y-4 border p-5 rounded-2xl bg-slate-50 border-slate-200">
              <h3 class="text-sm font-bold text-slate-800 border-b pb-2 mb-2">Delivery Location <span class="text-rose-500">*</span></h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-700">Country</label>
                  <input disabled type="text" value="Nigeria" class="w-full px-5 md:px-8 py-3 bg-slate-100 border border-slate-200 rounded-xl outline-none font-medium text-slate-500 cursor-not-allowed" />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-700">State</label>
                  <input disabled type="text" value="Lagos" class="w-full px-5 md:px-8 py-3 bg-slate-100 border border-slate-200 rounded-xl outline-none font-medium text-slate-500 cursor-not-allowed" />
                </div>
                <div class="space-y-2 sm:col-span-2">
                  <CustomSelect 
                    v-model="orderData.lga"
                    label="Local Government Area (LGA) *"
                    :options="lagosLGAs.map(lga => ({ label: lga, value: lga }))"
                    placeholder="Select your LGA..."
                  />
                </div>
                <div class="space-y-2 sm:col-span-2">
                  <label class="text-xs font-bold text-slate-700">Street Address <span class="text-rose-500">*</span></label>
                  <input v-model="orderData.streetAddress" required type="text" class="w-full px-5 md:px-8 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="e.g. 15 Awolowo Road, Ikoyi" />
                </div>
                <div class="space-y-2 sm:col-span-2">
                  <label class="text-xs font-bold text-slate-700">Nearest Landmark</label>
                  <input v-model="orderData.landmark" type="text" class="w-full px-5 md:px-8 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="e.g. Opposite GTBank" />
                </div>
              </div>
            </div>
            
            <div class="md:col-span-2">
              <label class="flex items-start gap-3 cursor-pointer group bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
                <input v-model="orderData.saveDeliveryOptions" type="checkbox" class="mt-1 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 border-slate-300" />
                <div>
                  <span class="block text-sm font-bold text-slate-800">Save delivery details for future use</span>
                  <span class="block text-xs text-slate-500 mt-1 font-medium">We'll auto-fill these details next time you shop.</span>
                </div>
              </label>
            </div>
          </div>
        </section>

        <!-- Delivery Time Flexibility -->
        <section class="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
            <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">2</span>
            Delivery Options
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label :class="['relative flex flex-col p-6 rounded-2xl cursor-pointer transition-all border-2', orderData.deliveryMethod === 'pickup' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 hover:border-emerald-200 bg-white']">
              <input v-model="orderData.deliveryMethod" value="pickup" type="radio" name="delivery_method" class="absolute right-5 top-5 text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" />
              <span class="font-extrabold text-slate-900 mb-1 text-lg">Pickup</span>
              <span class="text-sm text-slate-500 font-medium">Pick up your order in-store</span>
              <span class="mt-4 text-sm font-bold text-emerald-600 bg-emerald-100 w-fit px-3 py-1 rounded-md">Free</span>
            </label>
            <label :class="['relative flex flex-col p-6 rounded-2xl cursor-pointer transition-all border-2', orderData.deliveryMethod === 'delivery' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 hover:border-emerald-200 bg-white']">
              <input v-model="orderData.deliveryMethod" value="delivery" type="radio" name="delivery_method" class="absolute right-5 top-5 text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" />
              <span class="font-extrabold text-slate-900 mb-1 text-lg">Delivery</span>
              <span class="text-sm text-slate-500 font-medium">Have it delivered to your address</span>
              <span class="mt-4 text-xs font-bold text-slate-600 bg-slate-100 w-full px-3 py-2 rounded-md leading-snug">
                Delivery cost would be incurred by the customer and paid to the dispatch rider on arrival.
              </span>
            </label>
          </div>
          
          <!-- Order Notes -->
          <div class="mt-8 pt-6 border-t border-slate-100">
            <label class="block text-sm font-bold text-slate-700 mb-2">Order Notes <span class="text-slate-400 font-normal">(Optional)</span></label>
            <textarea 
              v-model="orderData.orderNotes"
              rows="3"
              class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none text-sm"
              placeholder="Add any additional information for the vendor..."
            ></textarea>
          </div>

          <!-- Scheduled Time Picker -->
          <div class="mt-8 pt-6 border-t border-slate-100">
            <h3 class="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
              <svg class="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Schedule Delivery Time <span class="text-slate-400 font-normal text-sm">(Optional)</span>
            </h3>
            <p class="text-sm text-slate-500 mb-4">Want your smoothies at a specific time? Pick a date and time slot.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <CustomDatePicker
                  v-model="orderData.scheduledDate"
                  label="Date"
                  :min="minScheduleDate"
                />
              </div>
              <div class="space-y-2">
                <CustomSelect
                  v-model="orderData.scheduledSlot"
                  label="Time Slot"
                  :options="[
                    {label: 'ASAP (No preference)', value: ''},
                    {label: 'Morning (9:00 AM)', value: '09:00'},
                    {label: 'Noon (12:00 PM)', value: '12:00'},
                    {label: 'Afternoon (3:00 PM)', value: '15:00'},
                    {label: 'Evening (6:00 PM)', value: '18:00'}
                  ]"
                  placeholder="Select time slot..."
                />
              </div>
            </div>
          </div>
        </section>

        <!-- Payment Method -->
        <section class="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
            <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">3</span>
            Secure Payment
          </h2>
          <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm text-slate-600 font-medium">You will be securely redirected to Paystack to complete your payment.</p>
              <!-- Paystack logo placeholder / cards -->
              <div class="flex items-center gap-2">
                <div class="w-10 h-6 bg-slate-200 rounded shadow-sm"></div>
                <div class="w-10 h-6 bg-slate-200 rounded shadow-sm"></div>
              </div>
            </div>
            
            <!-- Tokenization / Subscription Opt-In -->
            <label v-if="!route.query.planId" class="flex items-start gap-3 mt-6 cursor-pointer group bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
              <input v-model="orderData.isSubscription" type="checkbox" class="mt-1 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 border-slate-300" />
              <div>
                <span class="block text-sm font-bold text-slate-800">Make this a recurring subscription</span>
                <span class="block text-xs text-slate-500 mt-1 font-medium">Get these exact items delivered on a schedule.</span>
              </div>
            </label>

            <div v-if="orderData.isSubscription && !route.query.planId" class="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100 relative">
              <label class="text-sm font-bold text-slate-800 block mb-2">How often?</label>
              
              <!-- Custom Dropdown -->
              <div class="mt-1">
                <CustomSelect
                  v-model="orderData.subscriptionFrequency"
                  :options="[
                    {label: 'Weekly', value: 'weekly'},
                    {label: 'Monthly', value: 'monthly'}
                  ]"
                />
              </div>
            </div>

            <label class="flex items-start gap-3 mt-6 cursor-pointer group bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
              <input v-model="orderData.saveCard" type="checkbox" class="mt-1 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 border-slate-300" />
              <div>
                <span class="block text-sm font-bold text-slate-800">Save my card for future purchases</span>
                <span class="block text-xs text-slate-500 mt-1 font-medium">Required if you want to turn this order into a recurring subscription later.</span>
              </div>
            </label>
          </div>
          
          <div v-if="isSubscriptionCheckout" class="mt-6 mb-4">
            <label class="flex items-start gap-3 cursor-pointer p-4 bg-slate-50 rounded-xl border border-slate-200">
              <input v-model="orderData.acceptedTerms" type="checkbox" class="mt-1 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 border-slate-300" />
              <div class="text-sm text-slate-700">
                I accept the 
                <button type="button" @click.stop="showTermsModal = true" class="text-emerald-600 font-bold hover:underline inline-flex items-center gap-1">
                  Subscription Terms & Conditions
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
              </div>
            </label>
          </div>

          <button type="submit" :disabled="loading || (!isSubscriptionCheckout && cart.length === 0 && !route.query.planId) || !isFormValid" class="w-full mt-8 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-black py-4 px-6 rounded-xl transition-all shadow-xl hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.98] flex items-center justify-center gap-3 text-lg">
            <span v-if="loading" class="w-6 h-6 border-2 border-slate-400 border-t-white rounded-full animate-spin"></span>
            <span v-if="loading">Processing Order...</span>
            <span v-else>Pay ₦{{ finalTotal.toLocaleString() }}</span>
            <svg v-if="!loading" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </section>
      </form>

      <!-- Order Summary Sidebar -->
      <div class="lg:col-span-1">
        <div class="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-28">
          <h3 class="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">Order Summary</h3>
          
          <div v-if="!isSubscriptionCheckout && cart.length === 0" class="text-center py-8">
            <div class="text-2xl md:text-4xl mb-4">🛒</div>
            <p class="text-slate-500 font-medium">Your cart is empty.</p>
            <NuxtLink to="/products" class="text-emerald-600 hover:text-emerald-500 font-bold mt-4 inline-block">Browse Products</NuxtLink>
          </div>
          
          <div v-else-if="route.query.planId && subscriptionPlan">
            <div class="mb-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-sm flex-shrink-0 text-2xl">
                  🔁
                </div>
                <div>
                  <span class="text-sm font-bold text-slate-800 block truncate w-32" :title="subscriptionPlan.name">{{ subscriptionPlan.name }}</span>
                  <span class="text-xs text-slate-500 capitalize">{{ subscriptionPlan.frequency }} plan</span>
                </div>
                <div class="ml-auto font-bold text-slate-900">₦{{ subscriptionPlan.price.toLocaleString() }}</div>
              </div>
              
              <!-- Plan Products List -->
              <div v-if="checkoutPlanProducts && checkoutPlanProducts.length > 0" class="mt-4 pt-4 border-t border-slate-100">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Included Products</h4>
                  <button v-if="subscriptionPlan.allowSwaps !== false && subscriptionPlan.swappableProductIds?.length > 0" @click="openSwapModal" type="button" class="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors">Swap</button>
                </div>
                <div class="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  <div class="flex items-center gap-3" v-for="prod in checkoutPlanProducts" :key="prod._id">
                    <div class="w-8 h-8 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-xs flex-shrink-0">
                      <img v-if="prod.images && prod.images[0]" :src="prod.images[0]" class="w-full h-full object-cover rounded-lg" />
                      <span v-else>{{ prod.icon || '📦' }}</span>
                    </div>
                    <div>
                      <span class="text-xs font-bold text-slate-800 block truncate w-40" :title="prod.name">{{ prod.name }}</span>
                      <span class="text-[10px] text-slate-500">Qty: 1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
              <div class="flex justify-between items-center" v-for="item in cart" :key="item.product._id">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-sm flex-shrink-0">
                    <img v-if="item.product.imageUrl" :src="item.product.imageUrl" class="w-full h-full object-cover rounded-lg" />
                    <span v-else>{{ item.product.icon || '📦' }}</span>
                  </div>
                  <div>
                    <span class="text-sm font-bold text-slate-800 block truncate w-32" :title="item.product.name">{{ item.product.name }}</span>
                    <div class="flex items-center gap-3 mt-1">
                      <div class="flex items-center border border-slate-200 rounded bg-white overflow-hidden w-fit">
                        <button type="button" @click.stop="updateQuantity(item.product._id, item.quantity - 1)" class="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-50 font-medium text-xs">-</button>
                        <span class="w-6 text-center font-medium text-xs text-slate-900">{{ item.quantity }}</span>
                        <button type="button" @click.stop="updateQuantity(item.product._id, item.quantity + 1)" class="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-50 font-medium text-xs">+</button>
                      </div>
                      <button type="button" @click.stop="removeFromCart(item.product._id)" class="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50" title="Remove">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
                <span class="font-bold text-slate-900">₦{{ (item.product.price * item.quantity).toLocaleString() }}</span>
              </div>
            </div>
            
            <!-- Promo Code Section -->
            <div class="border-t border-slate-100 py-6">
              <label class="text-sm font-bold text-slate-700 block mb-2">Have a Promo Code?</label>
              <div class="flex gap-2">
                <input v-model="promoCodeInput" :disabled="!!appliedPromo" type="text" class="flex-1 min-w-0 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all uppercase font-mono text-sm" placeholder="ENTER CODE" />
                <button v-if="!appliedPromo" @click="applyPromo" :disabled="!promoCodeInput || validatingPromo" type="button" class="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm shrink-0">
                  {{ validatingPromo ? '...' : 'Apply' }}
                </button>
                <button v-else @click="removePromo" type="button" class="bg-rose-100 hover:bg-rose-200 text-rose-600 px-4 py-2 rounded-lg font-bold transition-colors text-sm shrink-0">
                  Remove
                </button>
              </div>
              <p v-if="appliedPromo" class="text-emerald-600 text-sm font-medium mt-2 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Promo applied: {{ appliedPromo.code }}
              </p>
            </div>
            <div class="border-t border-slate-100 pt-6 space-y-3">
              <div class="flex justify-between text-slate-500 text-sm font-medium">
                <span>Subtotal</span>
                <span class="text-slate-900">₦{{ cartTotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-slate-500 text-sm font-medium">
                <span>Delivery Fee</span>
                <span class="text-slate-900">Paid on Arrival</span>
              </div>
              <div v-if="appliedPromo" class="flex justify-between text-emerald-600 text-sm font-bold">
                <span>Discount ({{ appliedPromo.code }})</span>
                <span>-₦{{ discountAmount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-lg font-black text-slate-900 mt-4 pt-4 border-t border-slate-100">
                <span>Total</span>
                <span class="text-emerald-600">₦{{ finalTotal.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AuthModal :isOpen="showAuthModal" @success="handleAuthSuccess" @close="showAuthModal = false" />

    <!-- Subscription Terms Modal -->
    <div v-if="showTermsModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showTermsModal = false"></div>
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[90vh]">
        <div class="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 class="text-xl font-bold text-slate-900">Subscription Terms & Conditions</h3>
          <button @click="showTermsModal = false" class="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">✕</button>
        </div>
        <div class="p-6 overflow-y-auto custom-scrollbar flex-1 text-slate-700 space-y-4 text-sm leading-relaxed">
          <div>
            <h4 class="font-bold text-slate-900 text-base mb-1">1. Subscription Overview</h4>
            <p>By subscribing to Lapadia's plans, you agree to receive automated deliveries based on your selected frequency (weekly or monthly).</p>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 text-base mb-1">2. Billing & Payments</h4>
            <p>Your saved card will be automatically charged at the beginning of each billing cycle. You must ensure sufficient funds are available to avoid delivery interruptions.</p>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 text-base mb-1">3. Cancellation Policy</h4>
            <p>You can cancel your subscription at any time through your account dashboard. Cancellations must be made at least 24 hours before your next scheduled delivery to avoid being charged for that cycle.</p>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 text-base mb-1">4. Minimum Commitments</h4>
            <p>Certain plans (e.g., Parfait - Once monthly) require a minimum commitment period (e.g., 3 months). Early cancellation of these plans may incur a penalty fee.</p>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 text-base mb-1">5. Delivery Modifications</h4>
            <p>If you need to skip a delivery or change your delivery address for a specific cycle, please do so via the dashboard at least 24 hours in advance.</p>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 text-base mb-1">6. Product Availability</h4>
            <p>In the rare event that a subscribed item is unavailable, we reserve the right to substitute it with a similar product of equal or greater value, after notifying you.</p>
          </div>
        </div>
        <div class="p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl shrink-0 flex justify-end gap-3">
          <button @click="showTermsModal = false" class="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors">Close</button>
          <button @click="showTermsModal = false; orderData.acceptedTerms = true" class="px-6 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-sm">
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>

    <!-- Swap Products Modal -->
    <div v-if="showSwapModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showSwapModal = false"></div>
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative flex flex-col max-h-[90vh]">
        <div class="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h3 class="text-xl font-bold text-slate-900">Customize Your Box</h3>
            <p class="text-sm text-slate-500 mt-1">Select exactly {{ subscriptionPlan?.productIds?.length || 0 }} items for your subscription.</p>
          </div>
          <button @click="showSwapModal = false" class="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">✕</button>
        </div>
        
        <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
          <div class="space-y-2">
            <div 
              v-for="prod in subscriptionPlan?.swappableProductIds || []" 
              :key="prod._id"
              @click="toggleSwapProduct(prod._id)"
              class="flex items-center gap-4 p-3 rounded-2xl border transition-all cursor-pointer select-none"
              :class="selectedSwapProductIds.includes(prod._id) ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 hover:border-emerald-300'"
            >
              <div class="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img v-if="prod.images?.[0]" :src="prod.images[0]" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-xl">🍹</div>
              </div>
              <div class="flex-1">
                <div class="font-bold text-slate-900 text-sm mb-1">{{ prod.name }}</div>
                <div class="text-xs text-slate-500 line-clamp-1">{{ prod.description }}</div>
              </div>
              <div class="shrink-0">
                <div :class="[ 'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors', selectedSwapProductIds.includes(prod._id) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300' ]">
                  <svg v-if="selectedSwapProductIds.includes(prod._id)" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl shrink-0">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-medium text-slate-600">Selected Items</span>
            <span class="font-bold" :class="selectedSwapProductIds.length === (subscriptionPlan?.productIds?.length || 0) ? 'text-emerald-600' : 'text-slate-900'">
              {{ selectedSwapProductIds.length }} / {{ subscriptionPlan?.productIds?.length || 0 }}
            </span>
          </div>
          <div class="flex justify-end gap-3">
            <button @click="showSwapModal = false" class="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors">Cancel</button>
            <button 
              @click="confirmSwap"
              :disabled="selectedSwapProductIds.length !== (subscriptionPlan?.productIds?.length || 0)"
              :class="[ 'px-6 py-2.5 rounded-xl font-bold text-white transition-all shadow-sm', selectedSwapProductIds.length === (subscriptionPlan?.productIds?.length || 0) ? 'bg-emerald-600 hover:bg-emerald-500 hover:shadow-md' : 'bg-slate-300 cursor-not-allowed' ]"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCreateOrder } from '~/composables/modules/orders/useCreateOrder';
import { useCart } from '~/composables/modules/cart/useCart';
import { useSettings } from '~/composables/modules/settings/useSettings';
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';
import { useCustomToast } from '~/composables/core/useCustomToast';

const route = useRoute();
const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();
const { loading, createOrder } = useCreateOrder();
const { showToast } = useCustomToast();
const { settings, getSettings } = useSettings();

const isSubscriptionCheckout = computed(() => !!route.query.planId || orderData.value.isSubscription);
const subscriptionPlan = ref<any>(null);
const checkoutPlanProducts = ref<any[]>([]);

const showSwapModal = ref(false);
const selectedSwapProductIds = ref<string[]>([]);

const toggleSwapProduct = (id: string) => {
  const maxItems = subscriptionPlan.value?.productIds?.length || 1;
  const index = selectedSwapProductIds.value.indexOf(id);
  
  if (index === -1) {
    if (selectedSwapProductIds.value.length >= maxItems) {
      showToast({ title: 'Limit Reached', message: `You can only select up to ${maxItems} items for this plan.`, type: 'warning' });
      return;
    }
    selectedSwapProductIds.value.push(id);
  } else {
    selectedSwapProductIds.value.splice(index, 1);
  }
};

const openSwapModal = () => {
  selectedSwapProductIds.value = checkoutPlanProducts.value.map((p: any) => p._id);
  showSwapModal.value = true;
};

const confirmSwap = () => {
  const maxItems = subscriptionPlan.value?.productIds?.length || 1;
  if (selectedSwapProductIds.value.length !== maxItems) {
    showToast({ title: 'Incomplete', message: `Please select exactly ${maxItems} items.`, type: 'warning' });
    return;
  }
  
  checkoutPlanProducts.value = (subscriptionPlan.value?.swappableProductIds || []).filter(
    (p: any) => selectedSwapProductIds.value.includes(p._id)
  );
  
  showSwapModal.value = false;
  showToast({ title: 'Success', message: 'Your box has been customized.', type: 'success' });
};

const isAuthenticated = ref(false);
const showAuthModal = ref(false);
const showTermsModal = ref(false);
const isFrequencyDropdownOpen = ref(false);

const promoCodeInput = ref('');
const appliedPromo = ref<any>(null);
const validatingPromo = ref(false);

const lagosLGAs = [
  'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
  'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja',
  'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin',
  'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'
];

const orderData = ref({
  fullName: '',
  email: '',
  phoneCode: '+234',
  phone: '',
  altPhoneCode: '+234',
  altPhone: '',
  lga: '',
  streetAddress: '',
  landmark: '',
  deliveryMethod: 'delivery',
  orderNotes: '',
  scheduledDate: '',
  scheduledSlot: '',
  saveCard: false,
  saveDeliveryOptions: false,
  isSubscription: false,
  subscriptionFrequency: 'weekly',
  acceptedTerms: false
});

const minScheduleDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

const isFormValid = computed(() => {
  const baseValid = (
    orderData.value.fullName.trim() !== '' &&
    orderData.value.email.trim() !== '' &&
    orderData.value.phone.trim().length >= 7 &&
    orderData.value.lga !== '' &&
    orderData.value.streetAddress.trim() !== ''
  );
  if (isSubscriptionCheckout.value) {
    return baseValid && orderData.value.acceptedTerms;
  }
  return baseValid;
});

onMounted(async () => {
  await getSettings();
  
  if (isSubscriptionCheckout.value) {
    try {
      // Fetch all plans and find the one requested (since we didn't add a single GET /plans/:id route)
      const { data } = await GATEWAY_ENDPOINT.get(`/subscriptions/plans`);
      const plan = data.find((p: any) => p._id === route.query.planId);
      if (plan) {
        subscriptionPlan.value = plan;
        orderData.value.isSubscription = true;
        orderData.value.subscriptionFrequency = plan.frequency;
        
        // Initialize checkout products with the default plan products
        checkoutPlanProducts.value = plan.productIds ? [...plan.productIds] : [];
        
        // If swappableProductIds is missing/empty but plan products exist, use plan products as the default swappable pool
        if (!plan.swappableProductIds || plan.swappableProductIds.length === 0) {
          plan.swappableProductIds = plan.productIds ? [...plan.productIds] : [];
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  if (token && userStr) {
    isAuthenticated.value = true;
    try {
      const user = JSON.parse(userStr);
      orderData.value.fullName = user.name || '';
      orderData.value.email = user.email || '';
    } catch (e) {
      console.error(e);
    }
  } else {
    showAuthModal.value = true;
  }
});

const handleAuthSuccess = (user: any) => {
  isAuthenticated.value = true;
  showAuthModal.value = false;
  orderData.value.fullName = user.name || '';
  orderData.value.email = user.email || '';
  showToast({ title: 'Success', message: 'You have been securely signed in.', type: 'success' });
};

const applyPromo = async () => {
  if (!promoCodeInput.value) return;
  validatingPromo.value = true;
  try {
    const res = await GATEWAY_ENDPOINT.get(`/promos/validate/${promoCodeInput.value}`);
    appliedPromo.value = res.data;
    showToast({ title: 'Promo Applied!', message: 'Your discount has been applied.', type: 'success' });
  } catch (error: any) {
    showToast({ title: 'Invalid Promo', message: error.response?.data?.message || 'Code invalid or expired', type: 'error' });
    promoCodeInput.value = '';
  } finally {
    validatingPromo.value = false;
  }
};

const removePromo = () => {
  appliedPromo.value = null;
  promoCodeInput.value = '';
};

const discountAmount = computed(() => {
  if (!appliedPromo.value) return 0;
  let baseTotal = isSubscriptionCheckout.value && subscriptionPlan.value ? subscriptionPlan.value.price : cartTotal.value;
  if (appliedPromo.value.discountType === 'percentage') {
    return (baseTotal * appliedPromo.value.discountValue) / 100;
  }
  return appliedPromo.value.discountValue;
});

const finalTotal = computed(() => {
  let baseTotal = isSubscriptionCheckout.value && subscriptionPlan.value ? subscriptionPlan.value.price : cartTotal.value;
  return Math.max(0, baseTotal - discountAmount.value);
});

const handleCheckout = async () => {
  if (!isSubscriptionCheckout.value && cart.value.length === 0) {
    showToast({ title: 'Cart Empty', message: 'Please add items to your cart before checking out.', type: 'warning' });
    return;
  }

  let scheduledTime = null;
  if (orderData.value.scheduledDate && orderData.value.scheduledSlot) {
    scheduledTime = new Date(`${orderData.value.scheduledDate}T${orderData.value.scheduledSlot}`);
  }

  const fullAddress = `${orderData.value.streetAddress}, ${orderData.value.lga}, Lagos, Nigeria.` + (orderData.value.landmark ? ` Landmark: ${orderData.value.landmark}` : '');

  const payload = {
    ...orderData.value,
    deliveryAddress: fullAddress,
    phone: `${orderData.value.phoneCode}${orderData.value.phone}`,
    altPhone: orderData.value.altPhone ? `${orderData.value.altPhoneCode}${orderData.value.altPhone}` : '',
    totalAmount: finalTotal.value,
    items: (isSubscriptionCheckout.value && route.query.planId && checkoutPlanProducts.value.length > 0) 
      ? checkoutPlanProducts.value.map((p: any) => ({
          productId: p._id,
          quantity: 1,
          priceAtPurchase: p.price || 0
        }))
      : cart.value.map(item => ({
          productId: item.product._id,
          quantity: item.quantity,
          priceAtPurchase: item.product.price
        })),
    isSubscription: isSubscriptionCheckout.value,
    subscriptionFrequency: route.query.planId ? undefined : orderData.value.subscriptionFrequency,
    planId: route.query.planId ? route.query.planId : undefined,
    promoCode: appliedPromo.value ? appliedPromo.value.code : undefined,
    scheduledTime,
    callbackUrl: window.location.origin + '/checkout/callback'
  };

  try {
    const result = await createOrder(payload);
    if (result && result.authorization_url) {
      // Clear cart before redirecting since order is essentially created
      // In a real app, clear cart ONLY on successful callback, but this is a demo
      localStorage.removeItem('cart'); 
      window.location.href = result.authorization_url;
    } else {
      showToast({ title: 'Checkout Failed', message: 'Failed to initialize payment with Paystack.', type: 'error' });
    }
  } catch (err: any) {
    console.error(err);
    showToast({ title: 'Error', message: err.response?.data?.message || 'An error occurred during checkout.', type: 'error' });
  }
};
</script>
