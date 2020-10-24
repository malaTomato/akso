<template>
  <div class="app-container">

    <div class="head-container">
      <el-form :inline="true" :model="record">
        <el-form-item label="用户">
          <el-input v-model="record.user" placeholder="用户" class="filter-item"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="record.mobile" placeholder="手机号" class="filter-item" maxlength="11" type="number" show-word-limit></el-input>
        </el-form-item>


        <el-form-item label="填报日期">
          <el-date-picker v-model="record.date" type="daterange" range-separator="至" start-placeholder="开始时间"
            end-placeholder="结束时间"></el-date-picker>
        </el-form-item>

        <el-button v-on:click="queryRecord" type="primary">查询</el-button>
      </el-form>

    </div>
    <div class="main-container">
      <el-table :stripe="true" :data="question" @selection-change="handleSelectionChange">
        <el-table-column label="选择" type="selection" ></el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="用户" prop="user"></el-table-column>
        <el-table-column label="手机号" prop="mobile"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column>

          <template v-slot="scope">
            <el-button type="text" v-on:click="detail(scope.row.id)">详情</el-button>
          </template>

        </el-table-column>


      </el-table>
        <el-button v-on:click="exp" type="success">导出</el-button>

    </div>

  </div>

</template>

<script>
  export default {
    data() {
      var now = new Date();
      return {
        record: {
          user: "",
          date: [now, now]
        },
        question: [
          {
            id: 1,
            user: "张三",
            mobile:"17633333222",
            createTime: "2020-10-23",
            title:"《xxxxxxx》"
          },
          {
            id: 2,
            user: "李四",
            mobile:"17633333222",
            createTime: "2020-10-23",
            title:"《xxxxxxx》"
          },
          {
            id: 3,
            user: "王五",
            mobile:"17633333222",
            createTime: "2020-10-23",
            title:"《xxxxxxx》"
          },
          {
            id: 4,
            user: "赵六",
            mobile:"17633333222",
            createTime: "2020-10-23",
            title:"《xxxxxxx》"
          }
        ],
        ids:[]
      }
    },
    methods: {

      handleSelectionChange(v){
        this.ids = v;
      },

      queryRecord() {


        console.log(this.record)
      },


      exp(v){
        console.log(this.ids[0].id)
      },

      detail(v){
        console.log(v+"详情");
      }


    }


  }
</script>

<style>
</style>
