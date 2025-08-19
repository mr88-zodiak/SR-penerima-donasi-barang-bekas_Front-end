<script setup>
import { ref } from 'vue'
import { UserIcon } from '@heroicons/vue/24/solid'
import Carouser from '@/components/Carouser.vue'
import Recomendation_sections from '@/components/Recomendation_sections.vue'
import Footer from '@/components/Footer.vue'
const dropdown = ref(false)
const isdarkMode = ref(localStorage.getItem('DarkMode') === 'true')
</script>

<template>
  <div
    class="container mx-auto overflow-auto bg-white shadow-md p-4 max-w-full h-full transition-all duration-300 ease-in-out text-black fixed top-0"
    :class="isdarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white text-black'"
  >
    <div
      class="row flex items-center justify-between shadow-lg p-4 bg-inherit rounded-lg fixed top-0 z-50 w-full"
      :class="isdarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white text-black'"
    >
      <h1 class="text-2xl font-bold">DonasiKita</h1>
      <form class="max-w-lg mx-auto">
        <div class="flex">
          <label
            for="search-dropdown"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Your Email</label
          >
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            class="cursor-pointer shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
            @click="dropdown = !dropdown"
          >
            All categories
            <svg
              class="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            class="z-10 fixed top-20 divide-y divide-gray-100 rounded-lg shadow-sm w-44"
            :class="[dropdown ? 'block' : 'hidden', isdarkMode ? 'dark:bg-gray-700' : 'bg-white']"
          >
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-button"
            >
              <li>
                <button
                  type="button"
                  class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Mockups
                </button>
              </li>
              <li>
                <button
                  type="button"
                  class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Templates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Design
                </button>
              </li>
              <li>
                <button
                  type="button"
                  class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Logos
                </button>
              </li>
            </ul>
          </div>
          <div class="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos, Design Templates..."
              required
            />
            <button
              type="submit"
              class="cursor-pointer absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <div class="user flex">
        <UserIcon class="w-8 h-8 text-gray-500 dark:text-black ms-4" />
        <p class="text-gray-500 dark:text-black ms-2">Someone</p>
      </div>
    </div>
    <div class="content">
      <Carouser />
      <div class="abstract relative">
        <svg
          id="wave"
          style="transform: rotate(180deg); transition: 0.3s"
          viewBox="0 0 1440 490"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stop-color="rgba(19.197, 20.373, 19.603, 1)" offset="0%"></stop>
              <stop stop-color="rgba(128.083, 250.328, 46.482, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            style="transform: translate(0, 0px); opacity: 1"
            fill="url(#sw-gradient-0)"
            d="M0,147L14.1,163.3C28.2,180,56,212,85,204.2C112.9,196,141,147,169,163.3C197.6,180,226,261,254,245C282.4,229,311,114,339,73.5C367.1,33,395,65,424,138.8C451.8,212,480,327,508,343C536.5,359,565,278,593,220.5C621.2,163,649,131,678,122.5C705.9,114,734,131,762,155.2C790.6,180,819,212,847,253.2C875.3,294,904,343,932,367.5C960,392,988,392,1016,400.2C1044.7,408,1073,425,1101,400.2C1129.4,376,1158,310,1186,310.3C1214.1,310,1242,376,1271,351.2C1298.8,327,1327,212,1355,171.5C1383.5,131,1412,163,1440,155.2C1468.2,147,1496,98,1525,89.8C1552.9,82,1581,114,1609,179.7C1637.6,245,1666,343,1694,392C1722.4,441,1751,441,1779,416.5C1807.1,392,1835,343,1864,285.8C1891.8,229,1920,163,1948,130.7C1976.5,98,2005,98,2019,98L2032.9,98L2032.9,490L2018.8,490C2004.7,490,1976,490,1948,490C1920,490,1892,490,1864,490C1835.3,490,1807,490,1779,490C1750.6,490,1722,490,1694,490C1665.9,490,1638,490,1609,490C1581.2,490,1553,490,1525,490C1496.5,490,1468,490,1440,490C1411.8,490,1384,490,1355,490C1327.1,490,1299,490,1271,490C1242.4,490,1214,490,1186,490C1157.6,490,1129,490,1101,490C1072.9,490,1045,490,1016,490C988.2,490,960,490,932,490C903.5,490,875,490,847,490C818.8,490,791,490,762,490C734.1,490,706,490,678,490C649.4,490,621,490,593,490C564.7,490,536,490,508,490C480,490,452,490,424,490C395.3,490,367,490,339,490C310.6,490,282,490,254,490C225.9,490,198,490,169,490C141.2,490,113,490,85,490C56.5,490,28,490,14,490L0,490Z"
          ></path>
          <defs>
            <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
              <stop stop-color="rgba(200.883, 4.155, 255, 1)" offset="0%"></stop>
              <stop stop-color="rgba(0, 0, 0, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            style="transform: translate(0, 50px); opacity: 0.9"
            fill="url(#sw-gradient-1)"
            d="M0,441L14.1,408.3C28.2,376,56,310,85,253.2C112.9,196,141,147,169,171.5C197.6,196,226,294,254,326.7C282.4,359,311,327,339,285.8C367.1,245,395,196,424,163.3C451.8,131,480,114,508,98C536.5,82,565,65,593,122.5C621.2,180,649,310,678,302.2C705.9,294,734,147,762,122.5C790.6,98,819,196,847,269.5C875.3,343,904,392,932,351.2C960,310,988,180,1016,114.3C1044.7,49,1073,49,1101,98C1129.4,147,1158,245,1186,302.2C1214.1,359,1242,376,1271,367.5C1298.8,359,1327,327,1355,334.8C1383.5,343,1412,392,1440,367.5C1468.2,343,1496,245,1525,245C1552.9,245,1581,343,1609,334.8C1637.6,327,1666,212,1694,147C1722.4,82,1751,65,1779,57.2C1807.1,49,1835,49,1864,98C1891.8,147,1920,245,1948,302.2C1976.5,359,2005,376,2019,383.8L2032.9,392L2032.9,490L2018.8,490C2004.7,490,1976,490,1948,490C1920,490,1892,490,1864,490C1835.3,490,1807,490,1779,490C1750.6,490,1722,490,1694,490C1665.9,490,1638,490,1609,490C1581.2,490,1553,490,1525,490C1496.5,490,1468,490,1440,490C1411.8,490,1384,490,1355,490C1327.1,490,1299,490,1271,490C1242.4,490,1214,490,1186,490C1157.6,490,1129,490,1101,490C1072.9,490,1045,490,1016,490C988.2,490,960,490,932,490C903.5,490,875,490,847,490C818.8,490,791,490,762,490C734.1,490,706,490,678,490C649.4,490,621,490,593,490C564.7,490,536,490,508,490C480,490,452,490,424,490C395.3,490,367,490,339,490C310.6,490,282,490,254,490C225.9,490,198,490,169,490C141.2,490,113,490,85,490C56.5,490,28,490,14,490L0,490Z"
          ></path>
          <defs>
            <linearGradient id="sw-gradient-2" x1="0" x2="0" y1="1" y2="0">
              <stop stop-color="rgba(0, 102.378, 255, 1)" offset="0%"></stop>
              <stop stop-color="rgba(29.48, 27.861, 24.283, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            style="transform: translate(0, 100px); opacity: 0.8"
            fill="url(#sw-gradient-2)"
            d="M0,0L14.1,73.5C28.2,147,56,294,85,302.2C112.9,310,141,180,169,106.2C197.6,33,226,16,254,81.7C282.4,147,311,294,339,294C367.1,294,395,147,424,98C451.8,49,480,98,508,147C536.5,196,565,245,593,228.7C621.2,212,649,131,678,106.2C705.9,82,734,114,762,122.5C790.6,131,819,114,847,130.7C875.3,147,904,196,932,245C960,294,988,343,1016,343C1044.7,343,1073,294,1101,236.8C1129.4,180,1158,114,1186,114.3C1214.1,114,1242,180,1271,171.5C1298.8,163,1327,82,1355,57.2C1383.5,33,1412,65,1440,122.5C1468.2,180,1496,261,1525,285.8C1552.9,310,1581,278,1609,294C1637.6,310,1666,376,1694,367.5C1722.4,359,1751,278,1779,245C1807.1,212,1835,229,1864,269.5C1891.8,310,1920,376,1948,351.2C1976.5,327,2005,212,2019,155.2L2032.9,98L2032.9,490L2018.8,490C2004.7,490,1976,490,1948,490C1920,490,1892,490,1864,490C1835.3,490,1807,490,1779,490C1750.6,490,1722,490,1694,490C1665.9,490,1638,490,1609,490C1581.2,490,1553,490,1525,490C1496.5,490,1468,490,1440,490C1411.8,490,1384,490,1355,490C1327.1,490,1299,490,1271,490C1242.4,490,1214,490,1186,490C1157.6,490,1129,490,1101,490C1072.9,490,1045,490,1016,490C988.2,490,960,490,932,490C903.5,490,875,490,847,490C818.8,490,791,490,762,490C734.1,490,706,490,678,490C649.4,490,621,490,593,490C564.7,490,536,490,508,490C480,490,452,490,424,490C395.3,490,367,490,339,490C310.6,490,282,490,254,490C225.9,490,198,490,169,490C141.2,490,113,490,85,490C56.5,490,28,490,14,490L0,490Z"
          ></path>
          <defs>
            <linearGradient id="sw-gradient-3" x1="0" x2="0" y1="1" y2="0">
              <stop stop-color="rgba(30, 41, 57, 1)" offset="0%"></stop>
              <stop stop-color="rgba(30, 41, 57, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            style="transform: translate(0, 150px); opacity: 0.7"
            fill="url(#sw-gradient-3)"
            d="M0,49L14.1,98C28.2,147,56,245,85,253.2C112.9,261,141,180,169,171.5C197.6,163,226,229,254,236.8C282.4,245,311,196,339,147C367.1,98,395,49,424,65.3C451.8,82,480,163,508,163.3C536.5,163,565,82,593,73.5C621.2,65,649,131,678,163.3C705.9,196,734,196,762,228.7C790.6,261,819,327,847,310.3C875.3,294,904,196,932,204.2C960,212,988,327,1016,334.8C1044.7,343,1073,245,1101,245C1129.4,245,1158,343,1186,351.2C1214.1,359,1242,278,1271,245C1298.8,212,1327,229,1355,253.2C1383.5,278,1412,310,1440,318.5C1468.2,327,1496,310,1525,310.3C1552.9,310,1581,327,1609,351.2C1637.6,376,1666,408,1694,383.8C1722.4,359,1751,278,1779,220.5C1807.1,163,1835,131,1864,163.3C1891.8,196,1920,294,1948,310.3C1976.5,327,2005,261,2019,228.7L2032.9,196L2032.9,490L2018.8,490C2004.7,490,1976,490,1948,490C1920,490,1892,490,1864,490C1835.3,490,1807,490,1779,490C1750.6,490,1722,490,1694,490C1665.9,490,1638,490,1609,490C1581.2,490,1553,490,1525,490C1496.5,490,1468,490,1440,490C1411.8,490,1384,490,1355,490C1327.1,490,1299,490,1271,490C1242.4,490,1214,490,1186,490C1157.6,490,1129,490,1101,490C1072.9,490,1045,490,1016,490C988.2,490,960,490,932,490C903.5,490,875,490,847,490C818.8,490,791,490,762,490C734.1,490,706,490,678,490C649.4,490,621,490,593,490C564.7,490,536,490,508,490C480,490,452,490,424,490C395.3,490,367,490,339,490C310.6,490,282,490,254,490C225.9,490,198,490,169,490C141.2,490,113,490,85,490C56.5,490,28,490,14,490L0,490Z"
          ></path>
        </svg>
      </div>
      <div class="content-recomend">
        <Recomendation_sections />
      </div>
      <Footer />
    </div>
  </div>
</template>
