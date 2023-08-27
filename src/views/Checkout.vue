<template>

    <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div class="px-4 pt-8">
            <p class="text-xl font-medium">Detail Order</p>
            <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                <div v-for="product in getCart" :key="product.cart_id"
                    class="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                        src="https://dynamic.zacdn.com/ZUdKPvYDCJYtr33ryJ08pF588II=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/jenahara-9720-1093614-4.jpg"
                        alt="" />
                    <div class="flex w-full flex-col px-4 py-4">
                        <span class="font-semibold">{{ product.name }}</span>
                        <span class="float-right text-gray-400">{{ product.qty }} pcs</span>
                        <p class="text-lg font-bold">Rp.{{ product.regular_price * product.qty }}</p>
                    </div>
                </div>
            </div>

            <p class="mt-8 text-lg font-medium">Pengiriman</p>
            <form class="mt-5 grid gap-6">
                <div class="relative">
                    <input class="peer hidden" id="radio_1" type="radio" value="standard" v-model="deliveryType" />
                    <span
                        class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label
                        class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for="radio_1">
                        <img class="w-14 object-contain" src="data:image/png;base64,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"
                            alt="" />
                        <div class="ml-5">
                            <span class="mt-2 font-semibold">JNE </span>
                            <p class="text-slate-500 text-sm leading-6">Pengiriman: 1-7 Hari</p>
                        </div>
                    </label>
                </div>
                <div class="relative">
                    <input class="peer hidden" id="radio_2" type="radio" value="express" v-model="deliveryType" />
                    <span
                        class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label
                        class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for="radio_2">
                        <img class="w-14 object-contain" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR--yDH2Z_RmjmvQqwJsn2O06Bs_keL5syb5w&usqp=CAU"
                            alt="" />
                        <div class="ml-5">
                            <span class="mt-2 font-semibold">Ninja Express</span>
                            <p class="text-slate-500 text-sm leading-6">Pengiriman: 1-5 Hari</p>
                        </div>
                    </label>
                </div>
            </form>

            <p class="mt-8 text-lg font-medium">Metode Pembayaran</p>
            <form class="mt-5 grid gap-6">
                <div class="relative">
                    <input class="peer hidden" id="radio_3" type="radio" value="cash_on_delivery" v-model="paymentType" />
                    <span
                        class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label
                        class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for="radio_3">
                        <img class="w-14 object-contain"
                            src="data:image/png;base64,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"
                            alt="" />
                        <div class="ml-5 mt-4">
                            <span class="mt-2 font-semibold">Kartu Kredit/Debit</span>
                            <!-- <p class="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p> -->
                        </div>
                    </label>
                </div>
                <div class="relative">
                    <input class="peer hidden" id="radio_4" type="radio" value="cash_on_delivery" v-model="deliveryType" />
                    <span
                        class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label
                        class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for="radio_4">
                        <img class="w-14 object-contain"
                            src="data:image/jpeg;base64,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"
                            alt="" />
                        <div class="ml-5 mt-4">
                            <span class="mt-16 font-semibold leading-6">COD (Bayar di Tempat)</span>
                            <!-- <p class="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p> -->
                        </div>
                    </label>
                </div>
            </form>
        </div>
        <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p class="text-xl font-medium">Detail Pembayaran</p>
            <div class="">
                <label for="email" class="mt-4 mb-2 block text-sm font-medium">Email</label>
                <div class="relative">
                    <input type="text" id="email" name="email"
                        class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="email@gmail.com" />
                    <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>
                </div>
                <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium">Nama Kartu</label>
                <div class="relative">
                    <input type="text" id="card-holder" name="card-holder"
                        class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="nama" />
                    <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                        </svg>
                    </div>
                </div>
                <label for="card-no" class="mt-4 mb-2 block text-sm font-medium">Detail Kartu</label>
                <div class="flex">
                    <div class="relative w-7/12 flex-shrink-0">
                        <input type="text" id="card-no" name="card-no"
                            class="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="xxxx-xxxx-xxxx-xxxx" />
                        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                <path
                                    d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                            </svg>
                        </div>
                    </div>
                    <input type="text" name="credit-expiry"
                        class="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="MM/YY" />
                    <input type="text" name="credit-cvc"
                        class="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="CVC" />
                </div>
                <label for="billing-address" class="mt-4 mb-2 block text-sm font-medium">Alamat</label>
                <div class="flex flex-col sm:flex-row">
                    <div class="relative flex-shrink-0 sm:w-7/12">
                        <input type="text" id="billing-address" name="billing-address"
                            class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="alamat" />
                        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <img class="h-4 w-4 object-contain"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrVG3rsKuDv31bs-iOzDS7w80GKKG1RJCOEQ&usqp=CAU" alt="" />
                        </div>
                    </div>
                    <select type="text" name="billing-state"
                        class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                        <option value="State">State</option>
                    </select>
                    <input type="text" name="billing-zip"
                        class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="ZIP" />
                </div>

                <!-- Total -->
                <div class="mt-6 border-t border-b py-2">
                    <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">Subtotal</p>
                        <p class="font-semibold text-gray-900">$399.00</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">Ongkir</p>
                        <p class="font-semibold text-gray-900">$8.00</p>
                    </div>
                </div>
                <div class="mt-6 flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900">Total</p>
                    <p class="text-2xl font-semibold text-gray-900">Rp.{{ totalHarga() }}</p>
                </div>
            </div>
            <button @click="performCheckout"
                class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Checkout</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            paymentType: '',
            deliveryType: '',
        };
    },
    computed: {
        ...mapGetters('cart', ['getCart']),

    },
    methods: {
        ...mapActions('cart', ['fetchCart']),
        ...mapActions('product', ['fetchProducts']),
        ...mapActions('product', ['fetchProducts']),
        ...mapActions('auth', ['getUserAddress']),
        // total price
        totalHarga() {
            this.total = this.getCart.reduce((acc, product) => {
                return acc + parseFloat(product.regular_price * product.qty);
            }, 0);

            return this.total.toFixed(2);

        },
        async performCheckout() {
            // Collect the product IDs to be checked out
            const cartItemIds = this.getCart.map(product => product.cart_id);
            // Get user address
            const userAddressResponse = await this.$store.dispatch('auth/getUserAddress');
            const userAddressId = userAddressResponse.data[0].id;

            const checkoutPayload = {
                shippingAddress: userAddressId,
                billingAddress: userAddressId,
                paymentType: this.paymentType,
                deliveryType: this.deliveryType,
                cart_item_ids: cartItemIds
            };

            // Call the checkout action with the collected IDs and user address
            await this.$store.dispatch('cart/checkoutCart', checkoutPayload);
        }
    },
    beforeMount() {
        this.fetchProducts();
    },

    mounted() {
        this.fetchCart();
    },
}
</script>