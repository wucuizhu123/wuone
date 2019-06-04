<template>
<div id="yy">
      <div style="width:50%;height:400px;border:1px solid #ccc; margin:0 auto;margin-top:100px;">
          <!-- :fetch-suggestions="querySearchAsync" -->
					<h1 style="font-size:30px;margin-top:100px;margin-bottom:50px; ">Change  userRoleId</h1>
    <el-select v-model="nameTom" multiple filterable collapse-tags default-first-option placeholder="UserName" style="width:30%;">
		<el-option v-for="item in nameList" :key="item.value" :label="item.label" :value="item.value" style="width:30%;"></el-option>
	</el-select>
     <el-select v-model="role" placeholder="UserRoleId" style="width:30%;">
        <el-option label="Super Admin" value="1"></el-option>
        <el-option label="Administrator" value="2"></el-option>
        <el-option label="User" value="3"></el-option>
      </el-select>
      <el-button @click="changAdmin">Change</el-button>
     </div>
		 </div>
</template>
<script>
import api from '../../api/indexapi';
	export default {
		   data(){
			return {
					apiUrl:api.apiUrl,
                role:"",
                nameTom:"",
                nameList:[],
            }
            },
            mounted() { 
            this.restaurants = this.loadAll();
  
        },
       
		methods: {
			changAdmin(){
				  let data = {'loginName':this.nameTom[0],"userRoleId":this.role};
                  this.$http.post(this.apiUrl+'/user/updateProfile',data).then(function(data) {
					  console.log(data);
					if(data.data.status == "0") {

						this.$message({ type: 'success',   message: 'Modified successfully!' });
					} else {
						this.$message.warning("If there is a problem with the data, please contact the administrator.");
					}

				}, function(res) {
					alert('error');
				}); 
			},
      querySearchAsync(queryString, cb) {
		
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					cb(results);
				}, 3000 * Math.random());
			},
			createStateFilter(queryString) {
				return(state) => {
					return(state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
			},

			loadAll() {
				let data = {'loginName':"abc"};
            this.$http.post(this.apiUrl+'/user/selectUserCase',data).then(function(data) {
					if(data.data.status == "0") {
						for(var i = 0; i < data.data.result.length; i++) {
							var coco = {};
							coco.value = "";
							coco.value = data.data.result[i].loginName;
							this.nameList.push(coco);
						}
					} else {
						this.$message.warning("If there is a problem with the data, please contact the administrator.");
					}

				}, function(res) {
					alert('error');
				});

				return this.model
			},
            

            }
	}
	</script>