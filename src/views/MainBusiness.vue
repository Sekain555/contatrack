<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <v-card color="card" elevation="12">
                    <v-container>
                        <v-row align="center" justify="center" class="ma-2">
                            <v-avatar size="128">
                                <v-img src="/src/assets/icons/anadir-empresa-128px.png"></v-img>
                            </v-avatar>
                        </v-row>
                        <v-row align="center" justify="center" class="ma-2">
                            <span class="text-h5 font-weight-bold text-primary"
                                style="font-family: 'Space Grotesk'">Nombre Empresa</span>
                        </v-row>
                        <v-row align="center" justify="center" class="mx-2 mt-2">

                        </v-row>
                        <v-row align="center" justify="space-around" class="mx-2 mb-2">
                            <v-img height="24" src="/src/assets/icons/rut-empresa-24px.png"></v-img>
                            <span class="text-body-1 font-stretch-100% text-primary"
                                style="font-family: 'Inter'">76.000.000-K</span>
                        </v-row>
                        <v-row align="center" justify="center" class="mx-2 mt-2">
                            <v-img height="24" src="/src/assets/icons/correo-electronico-24px.png"></v-img>
                        </v-row>
                        <v-row align="center" justify="center" class="mx-2 mb-2">
                            <span class="text-body-1 font-stretch-100% text-primary"
                                style="font-family: 'Inter'">correo@electronico.cl</span>
                        </v-row>
                        <v-row align="center" justify="center" class="mt-4 mb-1 mx-2">
                            <v-btn color="buttonprimary" append-icon="mdi-account-edit">Editar perfil</v-btn>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="9">
                <v-card color="card" elevation="12">
                    <v-container>
                        <v-row align="center" justify="center" class="mb-1">
                            <span class="text-h4 text-primary ma-2" style="font-family: 'Space Grotesk'">Menú
                                Contabilidad</span>
                        </v-row>

                        <v-divider></v-divider>

                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

</script>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>