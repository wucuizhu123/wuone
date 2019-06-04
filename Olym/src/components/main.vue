<template>
  
	<el-container  id="app" class="note" :style ="note">
  <el-header>
  	<span class="login-left"> Olympia PSI Dashboard <span class="changename" v-show="showo">-{{loname}}</span></span>
    <div class="login-le"><ul ><li class="oneScll"> Valid data is up till {{datamo}}</li> 
      <li class="twoScll">System is updated on: {{dataUp}}</li></ul></div>
      <el-popover
        placement="bottom"
        trigger="click">
            <ul class="ueer">
                <li @click="quit">Logout</li>     
                <li @click="dialogFormVisible = true">Change Password</li>
            </ul>
            <div slot="reference" class="login-right">
                <li><img src="../assets/com.jpg" width="40px" height="40px" id="ss"></li>
                <li><span class="login-left" style="font-size:18px;"> Welcome {{name}} </span>            
                </li><i class="el-icon-arrow-down el-icon--right"></i>
             </div>
      </el-popover>

<el-dialog title="Change Password" :visible.sync="dialogFormVisible">
<el-form :model="ruleForm2"  status-icon :rules="rules2" ref="ruleForm2" label-width="150px">
    <el-form-item label="loginname" prop="namem">
      <el-input type="text" v-model="ruleForm2.namem" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Old password" prop="passover">
      <el-input type="password" v-model="ruleForm2.passover" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Confirm password" prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <div class="dialog-footer">
    <el-button @click="resetForm('ruleForm2')">Reset</el-button>
    <el-button type="primary" @click="changen()" style="margin-left:10px;">Confirm</el-button>
  </div>
 </el-form>
</el-dialog>
</el-header>   
  <el-container>
    <el-aside  style="width:180px;" id="aside">    	 
      <el-menu	@select="clickIndex" :default-active="activeIndex"  class="el-menu-vertical-demo"  @open="handleOpen"  @close="handleClose"  background-color="rgba(9,9,9,0.2)" text-color="#fff" active-text-color="#ffd04b" router>
        <NavMenu :navMenus="itemList"></NavMenu>
      </el-menu>
      <ul style="color:#fff;font-Size:13px;position:absolute; bottom:1.5rem;">
        <li style="color:#ffd04b"><span style='font-Size:16px;color:#fff'>Info:</span> <br><br>&nbsp T-mall data is only up till<br> Nov.2018, pending for recover</li>
        <li  class="kok"><span style='font-Size:16px;color:#fff'>Contact:</span> <br><br> &nbsp Olympia_admi@lenovo.com</li>
      </ul>
    </el-aside>
    <el-main>     
       <router-view/>
    </el-main>
  </el-container> 
</el-container>
</template>
<script>
import api,{ setCookie,getCookie,delCookie } from '../api/indexapi'  
import {comm} from '../api/index';
import NavMenu from './NavMuen.vue';
// import Md5 from '../api/jquery.md5';
export default{
 
    components: {
        NavMenu
      },
   data() {
   var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input a password'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password again.'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('Two inconsistent passwords!'));
        } else {
          callback();
        }
      };
		return {
		    	currentMenu:'/TrendView',
			  	note: {
                backgroundImage: "url(" + require("../assets/mohu.jpg") + ") ",
                backgroundRepeat: "no-repeat",            
                backgroundPosition:"bottom right",
	              backgroundSize: "cover", 
             },
          ruleForm2: {
            pass: '',
            checkPass: '',
            namem: '',
            passover:""
          },
          rules2: {
             passover:[ {
                required: true, message: 'Old passwords can not be empty', trigger: 'blur'
          }],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          namem:[{
            required: true, message: 'loginname can not be empty', trigger: 'blur'
          }]
        },
          dialogFormVisible: false,
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          showo:true,
          itemList:[{
                      name: "PSI Overall View",
                      url: "Overall",
                      children:[],
                     },
                     {
                      name: "Product View",
                      url: "Product",
                      children:[],
                     },{            
                     name: "Category View",
                     url: "Category",
                      children:[],
                    },{            
                      name: "Models Comparison",
                      url: "Comparison",
                      children:[],
                    },{            
                      name: "Case Management",
                      url: "Table",
                      children:[],
                    },{            
                      name: "Help Tips",
                      url: "Help",
                      children:[],
                    }],
          formLabelWidth: '120px',  
          name: '',
           lent:[{
                    name: "User Management",
                    url: "q",
                    children:[{
                      name: "Add User",
                      url: "AddUser",
                      children:[],
                     },{
                      name: "Manage User",
                      url: "DelUser",
                      children:[],
                     }]
                  },{
                     name: "Authority Management",
                      url: "a",
                     children:[{
                      name: "Rights Management",
                      url: "Rights",
                      children:[],
                    }]
             }],
          dataUp:"2018.01.17",
          datamo:"2018.12",
          loname:"PSI Overall View",
          isCollapse: true
        };
    },
computed:{
      activeIndex(){
        return this.$route.path
      }
    },
created(){
 window.devicePixelRatio = 1;
},

 mounted(){
     
         	var Height=window.innerHeight-60;
          document.getElementById("aside").style.height=Height+"px";   
          	if(window.location.hash.indexOf("Quality_Portal")==-1){
						if(uname == ""){
								this.$router.push('/Login');
						}
						}else{
							this.$router.push('/Overall');
							 setCookie('username',"Quality_Portal",100000*60);
						}
            /*页面挂载获取保存的cookie值，渲染到页面上*/
           let uname = getCookie('username')
           this.name = uname
           let unLength = getCookie('listLength');
           console.log(unLength);
            if(unLength==8){
              this.itemList.unshift(...this.lent);
            }else if(unLength==7){
              this.itemList.unshift(this.lent[0]);
            }else{
              this.itemList=this.itemList;
            }
            console.log(this.itemList);
            /*如果cookie不存在，则跳转到登录页*/
             (window.innerWidth < 1100)? this.showo=false:this.showo=true;
            var pre = new Date();
            var year = pre.getFullYear();//当前年份
            var month = pre.getMonth() + 1; //当前月份
            var date = pre.getDate();//当前几号
            var lastmonth = pre.getMonth();
            var d = new Date(year, lastmonth, 0);//月份
            var aldate=d.getDate();//获取当前月份天数
      var myddy=pre.getDay();//获取当前星期几
      if(date>15){
          var so=month-1;
          if(so==0){
            var so=12;year=year-1;
          }
      }else{
        var so=month-2;
        if(so==0){
          var so=12;year=year-1;
        }else if(so==-1){
          var so=11;year=year-1;
        }
      }
    if(so < 10) { var so = "0" + so;}
      this.datamo = year + "-" + so ;  
		if(month < 10) { month = "0" + month;}
    if(date < 10) {date = "0" + date;}
      if(myddy==1){this.dataUp = year + "-" + month + "-" + date;
      }else if(myddy==0){
            if(lastmonth==0){
             year=year-1;lastmonth=12;
      }
      if(date-6<0){
         var alldate=aldate-(6-date);
         this.dataUp = year+ "-" + lastmonth + "-" + alldate;}else if(date-6==0){this.dataUp = year+ "-" + lastmonth + "-" + aldate;}
      }else{
        if(lastmonth==0){ year=year-1; lastmonth=12;}
          if(date-(myddy-1)<0){
            var alldate=aldate-((myddy-1)-date);
            this.dataUp = year + "-" + lastmonth + "-" + alldate;  
          }else if(date-(myddy-1)==0){         
            this.dataUp = year + "-" + lastmonth + "-" + aldate; 
          }else{
            var alldate=date-(myddy-1);
            this.dataUp = year + "-" + month + "-" + alldate; 
          }
      }               
    },
     
 methods:{
    changen(){
            this.$http.post(api.apiUrl + '/user/updateProfile', {
                            "loginname": this.ruleForm2.namem,
                            "password": this.ruleForm2.checkPass,
            }).then(function(data) {
                      if(data.data.result=="1") {                   
                            this.$message.warning("Successful account modification, please wait for administrator mail");
                            this.dialogFormVisible = false;
                      }else{
                          this.$message.warning("Problems with account modification,check the information");
                          this.dialogFormVisible = false;
                      }
            }, function(res) {
            alert('error');
            });
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    quit(){     
      delCookie('username');/*删除cookie*/
      delCookie('listLength');
      this.$router.push('/Login');
     },
    handleOpen(key, keyPath) {},
		handleClose(key, keyPath) {},
    clickIndex(index){
      if(index=="/Overall"){
   		  this.loname="PSI Overall View";
    	}else if(index=="/Product"){
        this.loname="Product View";
      } else if(index=="/ModelView2"){
        this.loname="Segment by Model View2";
      }else if(index=="/Help"){
        this.loname="Help Tips";
      }else if(index=="/Comparison"){
        this.loname="Model Comparison";
      }else if(index=="/Category"){
        this.loname="Category Trend View";
      }else if(index=="/Table"){
        this.loname="Case Management";
      }  
      window.addEventListener("sessionStorage.getItem('testKey')", () => { this.loname="Product View";console.log("lollo")}); 	
     }
  }
}
</script>
<style>
	@import"../css/common.css";
	*{
		margin:0px;
	  padding:0px;
  }  
	html, body {height:100%;overflow:auto;margin: 0;}
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;   
}
.login-right {
  line-height:40px;
  display:inline-block;
}
.login-right li{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
   float:left;
   margin-right:10px;
   display:inline-block;
}

</style>