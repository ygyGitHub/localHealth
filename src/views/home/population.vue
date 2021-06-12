<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="20">
          <div>常营人口信息列表</div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" @click="openModal('add','')">添加</el-button>
          <el-button type="primary" size="mini" @click="batchImport()">批量</el-button>
        </el-col>
      </el-row>
      <hr />
      <el-row style="margin:35px 0px">
        <el-col :span="22">
          <el-input placeholder="社区名称" prefix-icon="el-icon-search" v-model="search">
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" style="float:right">查询</el-button>
        </el-col>
      </el-row>
      <div>
        <el-table :data="tableData" border height="611px" width="100%" size="small">
          <el-table-column prop="id" label="序号" width="80" align="center">
            <template slot-scope="scope">
              {{
              (pagination.pageNum - 1) * pagination.pageSize + scope.$index + 1
            }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="社区名称" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="telephone" label="社区常驻人口" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="email" label="党员数量" min-width="200" align="center">
          </el-table-column>
          <el-table-column prop="corporateName" label="本市户口" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="corporateName" label="少数名族户口" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="corporateName" label="境外人口" min-width="150" align="center">
          </el-table-column>
          <el-table-column label="操作" min-width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="openModal('edit',scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteData(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block" style="margin-top: 10px;text-align: center">
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="pagination.pageNum" :page-sizes="[10, 30, 50]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" style="margin-top: 10px">
        </el-pagination>
      </div>
    </el-card>
    <modal :modalObj="dialogObj">
      <el-form ref="modalForm" :model="modalForm" :rules="rules" label-width="120px">
        <el-form-item label="社区名称">
          <el-input v-model="modalForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="社区常驻人口">
          <el-input v-model.number="modalForm.permanentNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="党员数量">
          <el-input v-model.number="modalForm.partyNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="本市户口">
          <el-input v-model.number="modalForm.cityNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="少数名族户口">
          <el-input v-model.number="modalForm.minorityNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="境外人口">
          <el-input v-model.number="modalForm.abroadNum" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="divauto" style="text-align: center;">
        <el-button type="primary" size="mini" @click="dialogObj.isShow = false">取消</el-button>
        <el-button type="primary" size="mini" @click="sureModal">确定</el-button>
      </div>
    </modal>
    <modal :modalObj="importModal">
      <div>上传文件</div>
      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-success="handleSuccess" :before-upload="beforeUpload" :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="divauto" style="text-align: center;">
        <el-button type="primary" size="mini" @click="importModal.isShow = false">关闭</el-button>
      </div>
    </modal>
  </div>
</template>

<script>
import modal from '@/components/dialog.vue';
export default {
  name: 'population',
  components: {
    modal
  },
  data() {
    return {
      search: "",
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      dialogObj: {
        title: '添加', // 标题
        isShow: false, // 是否显示
        width: '60%',
        height: '70%'
      },
      modalForm: {
        name: '',
        permanentNum: "",
        partyNum: "",
        cityNum: "",
        minorityNum: "",
        abroadNum: "",
      },
      rules: {
        name: [{ required: true, message: "请输入社区名称", trigger: " " }],
        permanentNum: [
          { required: true, message: '社区常驻人口不能为空', trigger: " " },
          { type: 'number', message: '社区常驻人口为数字值', trigger: " " }],
        partyNum: [
          { required: true, message: '党员数量不能为空', trigger: " " },
          { type: 'number', message: '党员数量必须为数字值', trigger: " " }],
        cityNum: [
          { required: true, message: '本市户口不能为空', trigger: " " },
          { type: 'number', message: '本市户口必须为数字值', trigger: " " }],
        minorityNum: [
          { required: true, message: '少数名族户口不能为空', trigger: " " },
          { type: 'number', message: '少数名族户口必须为数字值', trigger: " " }],
        abroadNum: [
          { required: true, message: '境外人口不能为空', trigger: " " },
          { type: 'number', message: '境外人口必须为数字值', trigger: " " }],
      },
      importModal: {
        title: '批量上传', // 标题
        isShow: false, // 是否显示
        width: '30%',
        height: '40%'
      },
      fileList: []
    };
  },
  methods: {
    sizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      //TODO 查询列表
    },
    currentChange(pageNum) {
      this.pagination.pageNum = pageNum;
      //TODO 查询列表
    },
    openModal(type, data) {
      this.status = type
      this.modalForm = {
        name: '',
        permanentNum: "",
        partyNum: "",
        cityNum: "",
        minorityNum: "",
        abroadNum: "",
      };
      if (type == "add") {
        this.dialogObj.title = "添加"
      } else {
        this.dialogObj.title = "编辑"
        this.modalForm.name = data.name
      }
      this.dialogObj.isShow = true
    },
    sureModal() {
      this.$refs.modalForm.validate(valid => {
        if (valid) {
          //TODO 保存
          this.dialogObj.isShow = false
        }
      })
    },
    deleteData(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    batchImport() { this.importModal.isShow = true },
    beforeUpload(file) {
      console.log(file);
    },
    handleSuccess(){}
  }
};
</script>

<style></style>
