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
                    <span class="text-h4 font-weight-bold text-primary" style="font-family: 'Space Grotesk'">Recupera tu
                        contraseña</span>
                </v-row>
                <v-row class="mt-6">
                    <span class="text-h6 font-stretch-100% text-primary" style="font-family: 'Inter'">Ingresa el correo
                        asociado a tu cuenta para
                        iniciar la recuperación de contraseña</span>
                </v-row>
            </v-col>
            <v-col cols="5">
                <v-card color="card" class="pa-6" elevation="12">
                    <v-card-title class="text-h4 font-weight-bold text-center text-primary">Recuperar
                        contraseña</v-card-title>

                    <v-card-text>
                        <v-text-field @input="validateForm" label="Correo electrónico" v-model="email"
                            :rules="emailRules" required clearable variant="outlined" class="mt-3"></v-text-field>

                        <v-alert v-if="mensaje" type="success" dismissible>
                            {{ mensaje }}
                        </v-alert>

                        <v-btn :disabled="!isValid" block color="buttonprimary" class="mt-4"
                            @click="recuperarContrasena">
                            Recuperar contraseña
                        </v-btn>
                    </v-card-text>

                    <v-card-actions class="justify-center">
                        <v-btn variant="text" color="buttonprimary" @click="gotoCreateAccount">Registrate</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn variant="text" color="buttonprimary" @click="gotoLogin">Inicia sesión</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { auth } from '@/config/firebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth";

export default {
    data() {
        return {
            email: '',
            mensaje: '',
            isValid: false,
            emailRules: [
                v => !!v || 'El correo es obligatorio',
                v => /.+@.+\..+/.test(v) || 'Debe ser un correo válido'
            ],
        };
    },
    methods: {
        validateForm() {
            this.isValid = this.email.trim() !== '';
        },
        gotoLogin() {
            this.$router.push('/login');
        },
        gotoCreateAccount() {
            this.$router.push('/create-account');
        },
        async recuperarContrasena() {
            try {
                await sendPasswordResetEmail(auth, this.email);
                this.mensaje = "Se han enviado instrucciones de recuperación a tu correo.";
            } catch (error) {
                console.error("Error al enviar el correo de recuperación:", error);
                this.mensaje = error.message;
            }
        },
    },
}
</script>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>