<template>
	<div class = "note" :style = "note">
		<div class="up">
    <span class = "noteon" :style = "noteon"></span>
    <div class="come">
      <p class="comeC">Olympia PSI Dashboard</p>
        <div class="comeE">
          <p class="topep">Together,</p>
          <p class="topOne">
            Quality<span style="color:#52cce3;"> Soars !</span> </p>
          <p class="toptwo">Our Vision</p>
          <p class="topthree">We commit to becoming a visionary, world-class quality team through spirited collaboration and customer focus.</p>
        </div>
    </div>
<!--login框，表单+tab标签页的组合-->
<div class = "loginFrame" v-show="showLogin">
  
<!--表单组件放在外面，标签栏在里面-->
    <el-form   class = "demo-ruleForm login-container commmenj" >
    <div class="poer">
    	<p  style="margin-bottom:5px;">Welcome</p>
      <p style="font-size:10px;margin-bottom:20px;">Release V1.0 @ Jan.2019</p>
    </div>
       <!--tab标签-->
 
  <div class = "formGroup">
      <el-form-item  prop = "user" >
          <el-input type = "text"  v-model="username" auto-complete = "off" placeholder = "User Name" class = "form-control" ></el-input></el-form-item> 
      <el-form-item  prop = "password" class = "form-inline">
          <el-input type = "password"  v-model="password" auto-complete = "off" placeholder = "Password" class = "form-control" ></el-input></el-form-item>
  </div>
    
    <div class = "formButton">
      <el-form-item style = "width:100%;">
          <el-button type = "primary" style = "width:40%;margin:0 auto;background:#ffd04b;border:1px solid #ffd04b;margin-top:15px;" v-on:click="login">Sign In</el-button>
      </el-form-item>
    </div>
    <div class="footer">
        <p v-show="showTishi" style="margin-bottom:10px;margin-top:5px;font-size:14px" > {{tishi}}</p>
        <ul >
        <li style="border-right:1px solid #494848;margin-left:15%;width:108px;font-size:16px"><span @click="dialogForm = true;">New Account</span></li>
        <li style="font-size:16px;width:140px;"><span @click="dialogFormVisible = true;"> Forget Password</span></li>
        </ul>
      
    </div>
      <p style="width:100%;float:left;font-size:10px;text-align:center;margin-top:7px;">Other problem contact : Olympia_admi@lenovo.com</p>
  </el-form>
  </div>



<!-- // 忘记密码 -->
    <el-dialog title="Forget Password" :visible.sync="dialogFormVisible">
       <el-form :model="ruleForm"  status-icon  ref="ruleForm" label-width="150px">
       <el-form-item label="ItCode ："  autocomplete="off" prop="code"  :rules="{required: true, message: 'Itcode Can not be empty', trigger: ['blur', 'change']}">
    <el-input v-model="ruleForm.code"></el-input>
  </el-form-item>
  <el-form-item  prop="email"  label="E-mail ： "  :rules="[{ required: true, message: 'Please enter your E-mail address', trigger: 'blur' }, { type: 'email', message: 'Please enter the correct E-mail address', trigger: ['blur', 'change'] }]">
    <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>
  <el-form-item label="Manager ItCode："  autocomplete="off" prop="mancode" :rules="{ required: true, message: 'Manager ItCode Can not be empty', trigger: ['blur', 'change'] }">
    <el-input v-model="ruleForm.mancode"></el-input>
  </el-form-item>
  <el-button type="primary" @click="forget('ruleForm')" class="conen">Submit</el-button>
    <el-button @click="resetForm('ruleForm')">Reset</el-button>
  </el-form>
</el-dialog>


<!-- 申请账户 -->
<el-dialog title="New Account" :visible.sync="dialogForm">
     <el-form :label-position="labelPosition" :model="dynamicValidateForm" status-icon ref="dynamicValidateForm" label-width="150px" >
   <el-form-item prop="email"  label="E-mail ： "  :rules="[{ required: true, message: 'Please enter your E-mail address', trigger: 'blur' }, { type: 'email', message: 'Please enter the correct E-mail address', trigger: ['blur', 'change'] } ]">
    <el-input v-model="dynamicValidateForm.email"></el-input>
  </el-form-item>
  <el-form-item label="ItCode ："   prop="itcode"    :rules="{ required: true, message: 'ItCode Can not be empty', trigger: ['blur', 'change']}">
    <el-input v-model="dynamicValidateForm.itcode"></el-input>
  </el-form-item>
  <el-form-item label="Department ："  prop="department"   :rules="{required: true, message: 'Department Can not be empty', trigger: ['blur', 'change'] }">
    <el-input v-model="dynamicValidateForm.department"></el-input>
  </el-form-item>
  <el-form-item label="Cause ：" prop="cause"   :rules="{required: true, message: 'Cause Can not be empty', trigger: ['blur', 'change'] }">
    <el-input v-model="dynamicValidateForm.cause"></el-input>
  </el-form-item>
  <el-form-item label="Manager E-mail ：" prop="manager"  
   :rules="[{ required: true, message: 'Please enter the Manager E-mail address', trigger: 'blur' },  { type: 'email', message: 'Please enter the correct Manager E-mail address', trigger: ['blur', 'change']}]">
    <el-input v-model="dynamicValidateForm.manager"></el-input>
  </el-form-item>
  <el-form-item label="Manager ItCode ：" prop="managerCode"  :rules="{required: true, message: 'ManagerCode Can not be empty', trigger: ['blur', 'change'] }">
    <el-input v-model="dynamicValidateForm.managerCode"></el-input>
  </el-form-item>
  <el-button type="primary" @click="submitForm('dynamicValidateForm')" class="conen">Submit</el-button>
    <el-button @click="resetForm('dynamicValidateForm')">Reset</el-button>
</el-form>
</el-dialog>
</div>
  </div>
</template>
<style scoped>
@import"../css/login.css";
	
   </style>

<script>
    import api,{setCookie,getCookie} from '../api/indexapi';
    import {comm} from '../api/index';
	// import Md5 from '../api/jquery.md5';
    export default{
        data(){
            return{
                showdan:false,
                labelPosition: 'right',

                dynamicValidateForm: {
                    email: '',
                    itcode:'',
                    department: '',
                    manager:"",
                    cause:"",
                    managerCode:"",
                  },
                ruleForm:{
                  code:'',
                  mancode:"",
                  email:""
                  
                },
                

                dialogFormVisible: false,
                dialogForm: false,
                showLogin: true,
                showRegister: false,
                showTishi: true,
                tishi: ' ',
                username: '',
                password: '',
                newUsername: '',
                newPassword: '',
                apiUrl: api.apiUrl,
                note: {
                    position:"absolute",
                    top:"0px",
                    left:"0px",
                    width: "100%",
                    height:"100%",                
                    backgroundImage: "url(" + require("../assets/mohu.jpg") + ") ",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition:"bottom right",
                    backgroundSize: "cover",         
	            
                },
                noteon: {
                    position:"fixed",
                    top:"40px",
                    left:"0px",
                    width: "50%",
                    height:"50%",                
                    backgroundImage: "url(" + require("../assets/biao.jpg") + ") ",
                    backgroundRepeat: "no-repeat", 
                },
            }
        },
   
  mounted(){
  /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if(getCookie('username')){ this.$router.push('/Overall') }
  },
  
  methods:{
      forget(){  
            this.$http.post(api.apiUrl + '/user/sendEmailForgotPasswordHtml', {
                            "itcode":this.ruleForm.code,
                            "managerCode":this.ruleForm.mancode,
                            "email":this.ruleForm.email
			                    	}).then(function(data) {
                            if(data.data.result=="1") {
                                  this.dialogFormVisible=false;
                                  this.$message.warning("Find success, wait for mail");
                            }else{
                                  this.$message.warning("Problem in Finding Accounts,check the information.");
                            }
              }, function(res) {
				          this.$message.warning('Error');
			    	});
      },
      login(){
        if(this.username == "" || this.password == ""){
             this.$message.warning("Please enter a username or password")
        }else{
            let data = {'loginName':this.username,'password':this.password}
            // let data = {'loginName':this.username,'password':Md5.md5(this.password)} //Md5加密
            /*接口请求*/
            // this.$http.post(this.apiUrl+'/user/login',data).then((res)=>{
              this.$http.post(api.apiUrl + '/user/login',data).then((res)=>{
                this.itemL=res.data.result.result.menus
                var leng=res.data.result.result.menus.length;
                  if(res.data.status == -1){
                      this.tishi = "Please check for input errors"
                      this.showTishi = true
                  }else{
                      this.showTishi = true
                      this.tishi = "Landing successfully"
                      setCookie('username',this.username,10000*60);
                      setCookie('listLength',leng,10000*60);               
                        // var students = JSON.stringify( this.itemL); //将JSON转为字符串存到变量里
                        // console.log(students);
                        // localStorage.setItem("students",students);//将变量存到localStorage里
                        // console.log(this.itemL);
                        // var newStudents = localStorage.getItem("students");
                        // newStudents = JSON.parse(students); //转为JSON
                        // console.log(newStudents); // 打印出原先对象
                      // sessionStorage.setItem('itemo',JSON.stringify(this.itemL));
                      setTimeout(function(){this.$router.push('/Overall')}.bind(this),1000)
                  }   
              })
          }
      },
    minu(){
        this.showdan=true;
    },
    submitForm(){
        if(this.dynamicValidateForm.email==""){
            this.$message.warning("Please fill in email");
        }else if(this.dynamicValidateForm.itcode==""){
            this.$message.warning("Please fill in itcode");
        }else if(this.dynamicValidateForm.department==""){
          this.$message.warning("Please fill in department");
        }else if(this.dynamicValidateForm.cause==""){
            this.$message.warning("Please fill in cause");
        }else if(this.dynamicValidateForm.manager==""){
          this.$message.warning("Please fill in manager");
        }else if(this.dynamicValidateForm.managerCode==""){
            this.$message.warning("Please fill in managerCode");
        }else{
              this.$http.post(api.apiUrl + '/user/sendEmailHtml', {
                         "email": this.dynamicValidateForm.email,
                        "itcode":this.dynamicValidateForm.itcode,
                        "department": this.dynamicValidateForm.department,
                        "cause": this.dynamicValidateForm.cause,
                        "manager": this.dynamicValidateForm.manager,
                        "managerCode":this.dynamicValidateForm.managerCode
			      	}).then(function(data) {
                    if(data.data.result=="1") {
                          this.dialogForm=false;
                          this.$message.warning("Successful application for account, please wait for administrator email");
                    }else{
                        this.dialogForm=false;
                        this.$message.warning("Problems with the application account,check the information");
                    }
                  }, function(res) {
                  this.$message.warning('Error');
                });
              }   
            },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
      }
    }
</script>


