<template>
	<div id="yy">
<div id="scorll">
    <div style=" margin:0 auto;"> <img src="../assets/Notes.png" class="tips"  ></div>
   <div style=" margin:0 auto;"> <img src="../assets/Y1920.png" class="tipson" ></div>
   <div style=" margin:0 auto;margin-top:30px;"> <img src="../assets/Y1819.png" class="tipson" ></div>
        <!-- <el-row :gutter="20">
				<el-col :span="24">
					<h1 style="text-align:left;font-size:2.18rem;padding-left:0.5rem; margin"> Help Tips </h1>
				</el-col>
				</el-row>
                <el-row :gutter="20">
                    <el-col :span="24">      
           <div  id="allCove">
           <div class="notess" >
             <p>1.PSI (Product Sentiment Index), an indictor for customer satisfaction, is calculated as:</p>
             <p class="conp">  PSI Score = 10 * (Positive mentions Qty – Negative mentions Qty) / (Positive qty + Negative qty) </p>
             <p>2.All-source PSI score for a selected Brand or Segment is calculated as:</p>
             <p class="conp">  All source PSI =JD.PSI * JD.weighting + Suning.PSI * Suning.weighting + T-mall.PSI * T-mall.weighting+ ....</p>
             <p class="conp">(Each data source’s weighting is fixed according to yearly statistic, details refer “Data Source Weighting Table”)</p>
             <p>3.JD.PSI score for a selected Brand or Segment is calculated as:</p>
             <p class="conp">JD.PSI =In-house Store.PSI * In-house Store.weighting + 3rd Party Store.PSI * 3rd Party Store.weighting</p>
             <p class="conp">( Store weighting is fixed according to yearly statistic, details refer “JD.com Store Weighting Table”)</p>
             <p>4.YTD (Year-To-Date), a time frame starting from Apr of each year to a calendar month with valid data</p>
             <p>5.Valid Data for Olympia means +90% desired comments is uploaded in the system</p>
             <p>6.Segmentation is only for Lenovo & Think products, not applicable for other brands (Eg. HP, Dell)</p>
           </div>
           <div >
               <h1 style="text-align:left; font-size:2rem;padding-left:0.5rem; margin-top:50px;margin-top:20px;"> Weighting Table</h1>
            <div class="one">
              <p>Data Source Weighting Table</p>
              <img src="../assets/one.png" width="340px" height="140px" ><img src="../assets/three.png" width="340px" height="140px" ></div>
            <div class="one">
              <p>JD.com Store Weighting Table</p>
              <img src="../assets/two.png" width="340px" height="140px" ><img src="../assets/four.png" width="340px" height="140px" ></div>
            
              </div>
</div>
  
                        </el-col>
                </el-row> -->
                </div>
        
    </div>
</template>
<style scoped>
 #allCove{
	width:90%;
	height:auto;
	font-size:22px;
	color:#000;
	top:60px;
	/* background:rgba(247, 203, 10, 0.9); */
    text-align:left;
}
#scorll {
	width: 98%;
	height: 100%;
	margin: 0 auto;
}
.notess{
    margin-top:50px;
    margin-left:70px;
}
.tips{
width:84.94rem;
 height:45rem;
}
.tipson{
    width:85.07rem; 
}
.conp{
   margin-left:30px; 
}
#yy {
	width: auto;
	height: 100%;
	text-align: center;
	background: #fff;
}

.zem{
	margin-left:30px;
}
.hao{
	float:left;
	margin-top:10px;
	margin-bottom:10px;
}


   </style>

<script>
</script>


