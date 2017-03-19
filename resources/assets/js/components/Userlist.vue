<template>
    <div class="container">
        <div class="row">

            <ul class="list-group">
              <li class="list-group-item" v-for="item in content">
                {{ item.email }}
              </li>
            </ul>

        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        props: ['content']
    }
</script>
