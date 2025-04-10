<template>
    <v-container>
        <v-row align="center" justify="start">
            <v-col cols="auto">
                <v-img width="64" max-height="64" src="/src/assets/contabilidad.png" contain></v-img>
            </v-col>
            <v-col>
                <span class="text-h3 font-weight-bold text-primary" style="font-family: 'Space Grotesk'">Software
                    Contable</span>
            </v-col>
        </v-row>

        <v-row class="mt-12" justify="space-around">
            <v-col cols="6">
                <v-row>
                    <span class="text-h4 font-weight-bold text-primary" style="font-family: 'Space Grotesk'">Crea una
                        cuenta nueva</span>
                </v-row>
                <v-row class="mt-6">
                    <span class="text-h6 font-stretch-100% text-primary" style="font-family: 'Inter'">Ingresa tus datos
                        para crear una cuenta
                        nueva</span>
                </v-row>
            </v-col>
            <v-col cols="5">
                <v-card color="card" class="pa-6" elevation="12">
                    <v-card-title class="text-h4 font-weight-bold text-center text-primary">Crear cuenta</v-card-title>

                    <v-card-text>
                        <v-text-field label="Nombre completo" required clearable variant="outlined" v-model="displayName" class="mt-3">
                        </v-text-field>
                        <v-text-field label="Correo electrónico" required clearable variant="outlined" v-model="email" class="mt-3">
                        </v-text-field>
                        <v-text-field label="Contraseña" required clearable variant="outlined" v-model="password" class="mt-3">
                        </v-text-field>

                        <v-btn block color="buttonprimary" class="mt-4" @click="registrarUsuario">
                            Crear cuenta
                        </v-btn>
                    </v-card-text>

                    <v-card-actions class="justify-center">
                        <v-btn variant="text" color="buttonprimary" @click="gotoLogin">¿Ya tienes
                            una cuenta? Inicia sesión</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            displayName: '',
            email: '',
            password: '',
            mensaje: '',
        };
    },
    methods: {
        gotoLogin() {
            this.$router.push('/login');
        },
        async registrarUsuario() {
            try {
                const response = await axios.post('http://localhost:3000/api/auth/register', {
                    email: this.email,
                    password: this.password,
                    displayName: this.displayName,
                });
                this.mensaje = response.data.message;
                this.$router.push('/login');
                console.log('Usuario registrado:', response.data.user);
            } catch (error) {
                console.error('Error registrando el usuario:', error);
                this.mensaje = error.response && error.response.data ? error.response.data.error : 'Error en el registro';
            }
        }
    }
}
</script>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>