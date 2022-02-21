<template>
  <div class="home min-h-screen">
    <div class="mt-28 text-center w-2/3 mx-auto">
      <h1 class="text-2xl md:text-4xl leading-loose my-4">
        Future Africa Conference
      </h1>
      <p class="text-lg leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit magnam
        fuga molestiae explicabo minima sapiente sunt iste ratione, id similique
        error facilis alias natus libero quisquam vero accusantium, provident
        voluptates?
      </p>

      <div class="actions mt-10">
        <router-link
          to="/talks"
          class="bg-primary border-primary border-2 text-white rounded-full py-3 px-7 mr-4"
        >
          Get Started
        </router-link>

        <router-link
          to="/submit"
          class="py-3 px-7 rounded-full border-accent border-2 text-gray-500"
        >
          Submit Talk
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style>
h1,
h2,
h3,
h4,
h5 {
  font-family: "Libre Baskerville", serif;
}

.home {
  background-image: url(../assets/images/bg-removebg.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
}
</style>
