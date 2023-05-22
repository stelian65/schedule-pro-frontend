<script setup>

const props = defineProps({
    label:{
        type:String,
        default:''
    },
    icon:{
        type:String,
        default:''
    },
    type:{
        type:String,
        default:'text'
    }
})


</script>

<template>
    <div class = container>
        <q-input color="indigo-12" bg-color="light-blue-1" :type="type" filled v-model="username" :label="label" >
            <template v-slot:prepend>
                <q-icon :name="icon" size="sm"/>
             </template>
        </q-input>       
    </div>
</template>

<style scoped>
.container{
    display: inline-flex;
}
</style>