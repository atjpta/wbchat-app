<template>
<div>
    <div v-if="message" class="">
            <n-alert :title=message type="success" closable>
            </n-alert>
    </div>
    <div v-if="error" class="">
            <n-alert :title=error type="error" closable>
            </n-alert>
    </div>
    <Form @submit="login"
        :validation-schema="FormSchema"
        class="flex justify-center my-20 bg-gradient-to-l from-sky-100 to-sky-500/50 min-w-max max-w-xl rounded-3xl p-10 mx-auto text-lg"
    >
    <div>
        <div class="p-2">
            <div for="username" >Tài khoản: </div>
            <Field
                name="username"
                type="text"
                class="rounded-md bg-gray-800/10"
                v-model="username"
            />
            <div class="text-red-900">
                <ErrorMessage name="username" class="error-feedback" />
            </div>
        </div>
        
        <div class="p-2">
            <div for="password">Mật khẩu</div>
            <Field
                name="password"
                type="password"
                class="rounded-md bg-gray-800/10"
                v-model="password"
            />
            <div class="text-red-900">
                <ErrorMessage name="password" class="error-feedback" />
            </div>
        </div>

        <div class="flex justify-center pt-10">
            <button 
              class="bg-teal-500 rounded-lg p-2 shadow-md w-44 hover:scale-125 duration-300"
              >
                Đăng nhập
              </button>
        </div>
    </div>
    </Form>
</div>
</template>

<script>
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import authService from "@/services/auth.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    
    methods: {
        async login(){
            this.message = "";
            this.error = "";
            try{
                this.user = await authService.login({username: this.username, password: this.password});
                this.message = "Đăng nhập thành công";
            }
            catch(error){
                console.log(error.message);
                this.error = "Sai tài khoản hoặc mật khẩu";
            }
        }
    },
    data() {
        
        const FormSchema = Yup.object().shape({
            username: Yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            password: Yup
                .string()
                .required("mật khẩu phải có giá trị.")
                .min(2, "mật phải ít nhất 8 ký tự."),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            //  để liên kết với các input trên form
            username: "",
            password: "",
            FormSchema,
            message: "",
            error: "",
            user:{},
        };
    },
    
};
</script>