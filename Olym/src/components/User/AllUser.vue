<template>
<div>
 <el-input v-model="tableDataName" placeholder="loginName" style="width:240px"></el-input>
 <el-button type="primary" @click="doFilter">search</el-button>

 <!-- <span style="width:15%">Screen loginName ：</span><el-input v-model="tableDataName" style="margin-top:10px;margin-bottom:10px;width:80%" size="mini" placeholder="Input keyword search"/> -->
<el-table :data="tableDataEnd" :row-class-name="tableRowClassName" :cell-style="{padding:'0px',fontSize:'13px'}" :header-cell-style="{background:'#000',color:'#fff',padding:'0px',fontSize:'16px'}" style="width: 100%;"  height="39rem"> 
          <el-table-column    type=index  label="#"  align="center" ></el-table-column>
            <el-table-column    prop="loginName"     label="Name"  align="center"    > </el-table-column >
            <el-table-column    prop="password"      label="password"  align="center"  width="180%" > </el-table-column >
            <el-table-column    prop="email"          label="email"  align="center"   width="220%"> </el-table-column >
            <el-table-column prop="managerCode"  label="managerCode" align="center"> </el-table-column>
        <el-table-column  prop="managerEmail"  align="center" label=" managerEmail"  width="220%"></el-table-column> 
             <el-table-column    prop="createTime"     label="createTime"  align="center" > </el-table-column >
            <el-table-column    prop="userRoleId"     label="userRoleId"  align="center"  > </el-table-column >
            <el-table-column    prop="deleteFlag"     label="deleteFlag"  align="center"  > </el-table-column >
  </el-table>
 <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 15, 20, 25]"
  :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"  :total="totalItems"> </el-pagination>
</div>
</template>
<script>
import api from '../../api/indexapi';
export default {
  
 data() {
 return {
  tableDataBegin: [],
        userList:[],
        tableDataName: "",
        tableDataEnd: [],
        currentPage: 1,
        pageSize: 25,
        totalItems: 0,
        apiUrl:api.apiUrl,
        filterTableDataEnd:[],
        flag:false
 };
 },
 created() {
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
                      this.totalItems = this.userList.length;
                    if (this.totalItems > this.pageSize) {
                      for (let index = 0; index < this.pageSize; index++) {
                      this.tableDataEnd.push(this.userList[index]);
                      }
                    } else {
                      this.tableDataEnd = this.userList;
                    }
                  }   
              })
     
 },
 methods: {
    tableRowClassName({row, rowIndex}) {
        if (row.deleteFlag == "Deleted") {
          return 'warning-row';
        } 
        return '';
      },
 //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
 //用两个变量接收currentChangePage函数的参数
 doFilter() {
  if (this.tableDataName == "") {
  this.$message.warning("查询条件不能为空！");
  return;
  }
  this.tableDataEnd = []
  //每次手动将数据置空,因为会出现多次点击搜索情况
  this.filterTableDataEnd=[];
  console.log(this.userList);
  this.userList.forEach((value, index) => {
  if(value.loginName){
   if(value.loginName.indexOf(this.tableDataName)>=0){
   this.filterTableDataEnd.push(value)
   }
  }

  });
  //页面数据改变重新统计数据数量和当前页
  this.currentPage=1
  this.totalItems=this.filterTableDataEnd.length
  //渲染表格,根据值
  this.currentChangePage(this.filterTableDataEnd)
  //页面初始化数据需要判断是否检索过
  this.flag=true
 },
 openData() {},
 handleSizeChange(val) {
  console.log(`每页 ${val} 条`);
  this.pageSize = val;
  this.handleCurrentChange(this.currentPage);
 },
 handleCurrentChange(val) {
  console.log(`当前页: ${val}`);
  this.currentPage = val;
  //需要判断是否检索
  if(!this.flag){
  this.currentChangePage(this.userList)
  }else{
  this.currentChangePage(this.filterTableDataEnd)  
  }
 }, //组件自带监控当前页码
 currentChangePage(list) {
   console.log(list);
  let from = (this.currentPage - 1) * this.pageSize;
  let to = this.currentPage * this.pageSize;
  this.tableDataEnd = [];
  for (; from < to; from++) {
    console.log(list[from]);
  if (list[from]) {
   this.tableDataEnd.push(list[from]);
  }
  }
 }
 }
};
</script>