<template>
    <v-navigation-drawer color="sidebar" floating permanent>
        <v-list class="h-100 d-flex flex-column">
            <v-list-item title="CONTRATACK" class="text-center">
                <template #prepend>
                    <v-img class="mx-1" height="32" width="32" src="/src/assets/contabilidad.png"></v-img>
                </template>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-subheader elevation:="15">GESTIÓN EMPRESAS</v-list-subheader>
            <v-list-item link to="/mainmenu" density="compact">
                <template #prepend>
                    <v-img class="mr-3" height="24" width="24" src="/src/assets/icons/mis-empresas-24px.png"></v-img>
                </template>
                Gestionar Empresas</v-list-item>
            <v-divider></v-divider>
            <v-list-subheader elevation:="15">LIBRO CONTABLE</v-list-subheader>
            <v-list-item link to="/mainbusiness" density="compact">
                <template #prepend>
                    <v-img class="mr-3" height="24" width="24"
                        src="/src/assets/icons/contabilidad-inicial-24px.png"></v-img>
                </template>
                Contabilidad Inicial</v-list-item>
            <v-list-item link density="compact">
                <template #prepend>
                    <v-img class="mr-3" height="24" width="24" src="/src/assets/icons/libro-contable-24px.png"></v-img>
                </template>
                Libro Contable</v-list-item>
            <v-divider></v-divider>
            <v-list-subheader>FORMULARIOS</v-list-subheader>
            <v-list-item link density="compact">F22</v-list-item>
            <div class="mt-auto">
                <v-divider></v-divider>
                <v-list-item v-if="user" class="mt-1"
                    :prepend-avatar="user.photoURL ? user.photoURL : 'https://cdn.vuetifyjs.com/images/john.png'"
                    :title="user.displayName ? user.displayName : 'Usuario sin nombre'" :subtitle="user.email">
                    <template v-slot:append>
                        <v-btn icon="mdi-logout" size="small" variant="text" @click="cerrarSesion"></v-btn>
                    </template>
                </v-list-item>
            </div>
        </v-list>
    </v-navigation-drawer>

    <v-main>
        <router-view />
    </v-main>
</template>

<script>
import { auth } from '@/config/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default {
    name: "MainLayout",
    data() {
        return {
            user: null, // Aquí se almacenará la información del usuario
        };
    },
    created() {
        // Escucha cambios en el estado de autenticación
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Extrae la información relevante y actualiza la variable 'user'
                this.user = {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                };
            } else {
                this.user = null;
            }
        });
    },
    methods: {
        cerrarSesion() {
            signOut(auth)
                .then(() => {
                    this.$router.push('/login');
                })
                .catch((error) => {
                    console.error("Error al cerrar sesión:", error);
                });
        }
    }
};
</script>