<template>
<div id="yy">
            <!-- :data="list"
            :row-class-name="tableRowClassName"
            :filter-change="filterTag"
            border
            style="width: 100%"> -->
  <span style="width:15%">Screen loginName ：</span><el-input v-model="search" style="margin-top:10px;margin-bottom:10px;width:80%" size="mini" placeholder="Input keyword search"/>
<el-table :data="userList.filter(data =>!search||data.loginName.toLowerCase().includes(search.toLowerCase()))" :row-class-name="tableRowClassName" :cell-style="{padding:'0px',fontSize:'13px'}" :header-cell-style="{background:'#000',color:'#fff',padding:'0px',fontSize:'16px'}" style="width: 100%;"  height="39rem"> 
          <el-table-column    type=index  label="#"  align="center" ></el-table-column>
            <el-table-column    prop="loginName"     label="Name"  align="center"    > </el-table-column >
            <el-table-column    prop="password"      label="password"  align="center"  width="180%" > </el-table-column >
            <!-- <el-table-column    prop="modifyTime"     label="modifyTime"  align="center"   > </el-table-column > -->
            <el-table-column    prop="email"          label="email"  align="center"   width="220%"> </el-table-column >
            <el-table-column prop="managerCode"  label="managerCode" align="center"> </el-table-column>
        <el-table-column  prop="managerEmail"  align="center" label=" managerEmail"  width="220%"></el-table-column> 
             <el-table-column    prop="createTime"     label="createTime"  align="center" > </el-table-column >
            <el-table-column    prop="userRoleId"     label="userRoleId"  align="center"  > </el-table-column >
            <el-table-column    prop="deleteFlag"     label="deleteFlag"  align="center"  > </el-table-column >
  </el-table>
</div>
</template>
<script>
	import api from '../../api/indexapi';
  export default {
    data() {
      return {
          userList:[],   
          search:"",
          apiUrl:api.apiUrl,
          
          
      }
    },
    mounted(){
        this.AllUser();
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (row.deleteFlag == "Deleted") {
          return 'warning-row';
        } 
        return '';
      },
        AllUser(){
            let data = {'loginName':"abc"};
            this.$http.post(this.apiUrl+'/user/selectUserCase',data).then((res)=>{
               console.log(res);
                  if(res.data.status == -1){
                    //   this.tishi = "Please check for input errors"               
                  }else{
                     this.userList=res.data.result;
                     for(let i=0;i<this.userList.length;i++){
                        this.userList[i].createTime=this.userList[i].createTime.slice(0,10);
                        (this.userList[i].deleteFlag==0)?this.userList[i].deleteFlag="Exist":this.userList[i].deleteFlag="Deleted";
                        if(this.userList[i].userRoleId==1){
                          this.userList[i].userRoleId="Super Admin"
                        }else if(this.userList[i].userRoleId==2){
                              this.userList[i].userRoleId="Administrators"
                        }else{
                            this.userList[i].userRoleId="User"
                        }
                     }
                  }   
              })
        }
    }
  }
</script>
<style>
.el-table .warning-row {
    background:#eee;
  }
   #yy{
        width:98%;
        margin:0 auto;
        
    }
</style>