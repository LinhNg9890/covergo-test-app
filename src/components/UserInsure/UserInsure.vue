<template>
    <div class="bg-white flex justify-center items-baseline h-full pt-4 sm:p-16">
        <div class="w-[30rem] h-full m-4 flex flex-col">
            <div class="bg-gray-200 w-full items-center text-center py-10" v-if="stateView === 'welcome'">
                <div>
                    <h1 class="text-sm sm:text-2xl font-bold inline-block text-gray-700">Hello There</h1>
                </div>
                <div class="mt-6">
                    <p>Let's buy some insurance. It is going to take only a few steps</p>
                </div>
                <div>
                    <ButtonBasic @click="getUserInsureData" Value="Start" AddClass="w-[8rem] mt-8 bg-slate-900 text-gray-200 hover:text-gray-400" />
                </div>
            </div>
            <div class="w-full h-full mt-4" v-if="stateView === 'register'">
                <form class="w-full max-w-lg" @submit.prevent>
                    <div class="w-full mb-6 text-center">
                        <h1 class="text-sm sm:text-2xl font-bold inline-block text-gray-700">Tell us about yourself</h1>
                    </div>
                    <div class="w-full mb-6">
                        <div class="md:w-1/2 m-auto px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Name
                            </label>
                            <input class="appearance-none block w-full text-gray-700 border
                                    border-gray-400 rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white" id="grid-first-name" 
                                    type="text" placeholder="Add text"
                                    v-model="user.name">
                        </div>
                    </div>
                    <div class="w-full mb-6">
                        <div class="md:w-1/2 m-auto px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Age
                            </label>
                            <input class="appearance-none block w-full text-gray-700 border
                                    border-gray-400 rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white" id="grid-first-name" 
                                    type="text" placeholder="Add Age"
                                    v-model="user.age">
                        </div>
                    </div>
                    <div class="w-full mb-2">
                        <div class="md:w-1/2 m-auto px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                Where do you live
                            </label>
                        </div>
                        <div class="md:w-1/2 m-auto px-3 relative">
                            <select class="block appearance-none w-full border border-gray-400 
                                    text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none 
                                    focus:bg-white focus:border-gray-500" id="grid-state" v-model="user.locationCode">
                                <option selected value="HKD">Hong Kong</option>
                                <option value="USD">USA</option>
                                <option value="AUD">Australia</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-200 w-full">
                        <div class="md:w-1/2 m-auto px-3 py-6">
                            <div class="flex items-center mb-4">
                                <input id="default-radio-1" type="radio" value="standard" checked v-model="user.packageCode" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Standard</label>
                            </div>
                            <div class="flex items-center mb-4">
                                <input id="default-radio-2" type="radio" value="safe" v-model="user.packageCode" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Safe (+250HKD, 50%)</label>
                            </div>
                            <div class="flex items-center mb-4">
                                <input id="default-radio-2" type="radio" value="supersafe" v-model="user.packageCode" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="default-radio-3" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Super Safe (+375HKD, 75%)</label>
                            </div>
                        </div>
                        <div class="w-full m-auto px-3 text-center py-4">
                            <h3 class="text-sm sm:text-lg font-bold inline-block text-gray-700">Your premium is: {{syncPremium}}{{' ' + user.locationCode}}</h3>
                        </div>
                    </div>
                    <div class="bg-gray-200 w-full text-center py-6">
                        <ButtonBasic @click="stateView = 'welcome'" Value="Back" AddClass="w-[6rem] mt-8 bg-gray-100 hover:bg-slate-900 border border-black text-gray-700 hover:text-gray-200 mr-6" />
                        <ButtonBasic @click="getSummary" Value="Next" AddClass="w-[6rem] mt-8 bg-slate-900 text-gray-200 hover:text-gray-400" />
                    </div>
                </form>
            </div>

            <div class="w-full h-full mt-4" v-if="stateView === 'summary'">
                <form class="bg-gray-200 w-full max-w-lg" @submit.prevent>
                    <div class="w-full mb-6 text-center py-3">
                        <h1 class="text-sm sm:text-2xl font-bold inline-block text-gray-700">Summary</h1>
                    </div>
                    <div class="w-full mb-6 text-center">
                        <p>Name: {{user.name}}</p>
                        <p>Age: {{user.age}}</p>
                        <p>Where do you live: {{user.location}}</p>
                        <p>Package: {{user.package}}</p>
                        <p>Premium: {{user.premium}}{{' ' + user.locationCode}}</p>
                    </div>
                    <div class="w-full text-center py-6">
                        <ButtonBasic @click="stateView = 'register'" Value="Back" AddClass="w-[6rem] mt-8 bg-gray-100 hover:bg-slate-900 border border-black text-gray-700 hover:text-gray-200 mr-6" />
                        <ButtonBasic @click="stateView = 'welcome'" Value="Buy" AddClass="w-[6rem] mt-8 bg-slate-900 text-gray-200 hover:text-gray-400" />
                    </div>
                </form>
            </div>
            <div class="bg-gray-200 w-full items-center text-center py-6" v-if="stateView === 'error'">
                <div>
                    <h1 class="text-sm sm:text-2xl font-bold inline-block text-gray-700">Ooops</h1>
                </div>
                <div class="mt-6">
                    <p>Your age is over our accepted limit</p>
                    <p>We are sorry but we canot insure you now </p>
                </div>
                <div>
                    <ButtonBasic @click="stateView = 'welcome'" Value="Ok :(" AddClass="w-[8rem] mt-10 bg-slate-900 text-gray-200 hover:text-gray-400" />
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./UserInsure.js"></script>