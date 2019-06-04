<template>
    <router-view></router-view>
</template>

<script>
  export default {
  	data(){
  		return{
  		
  		}
  	}
  }
</script>

<style>
	@import"css/common.css";
	
	*{
	margin:0px;
	  padding:0px;
	}
	.mainapp{
		
	}
	html, body{ margin:0; height:100%; }
#app {
	

  font-family:Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
   
}

</style>
<script>
 import{ setCookie,getCookie} from './api/indexapi';

	export default{
	data() {
			return {	
				name: '',
				loname:""
			};
	},
  mounted(){
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username')
            this.name = uname
            /*如果cookie不存在，则跳转到登录页*/
            if(uname == ""){
                this.$router.push('/Login')
            }
          },
  
}
</script>