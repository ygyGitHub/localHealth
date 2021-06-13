/** * @Description: 常营党建 * @author GyYU * @Date 2021-6-13 09:53:09 */
<template>
  <div>
    <el-card style="min-height: 870px;">
      <el-row>
        <el-col :span="20"><div>家庭医生信息列表</div></el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" @click="openModal('add', '')">添加</el-button>
          <el-button type="primary" size="mini" @click="batchImport()">批量</el-button>
        </el-col>
      </el-row>
      <hr />
      <el-row style="margin:35px 0px">
        <el-col :span="22"><el-input placeholder="社区名称" prefix-icon="el-icon-search" v-model="search"></el-input></el-col>
        <el-col :span="2"><el-button type="primary" style="float:right" @click="getData">查询</el-button></el-col>
      </el-row>
      <div>
        <el-table :data="paginationTableData" border height="611px" width="100%" size="small">
          <el-table-column prop="id" label="序号" width="80" align="center">
            <template slot-scope="scope">
              {{ (pagination.pageNum - 1) * pagination.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="sqmc" label="社区名称" min-width="150" align="center"></el-table-column>
          <el-table-column prop="qyl" label="签约率" min-width="150" align="center"></el-table-column>
          <el-table-column label="操作" min-width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="openModal('edit', scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteData(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block" style="margin-top: 10px;text-align: center">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="pagination.pageNum"
          :page-sizes="[10, 30, 50]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
          style="margin-top: 10px"
        ></el-pagination>
      </div>
    </el-card>
    <modal :modalObj="dialogObj">
      <el-form ref="modalForm" :model="modalForm" :rules="rules" label-width="120px">
        <el-form-item label="社区名称" prop="sqmc"><el-input v-model="modalForm.sqmc" ></el-input></el-form-item>
        <el-form-item label="签约率" prop="qyl"><el-input v-model.number="modalForm.qyl" ></el-input></el-form-item>
      </el-form>
      <div class="divauto" style="text-align: center;">
        <el-button type="primary" size="mini" @click="dialogObj.isShow = false">取消</el-button>
        <el-button type="primary" size="mini" @click="sureModal">确定</el-button>
      </div>
    </modal>
    <modal :modalObj="importModal">
      <div style="text-align: center;">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-success="handleSuccess" :before-upload="beforeUpload" :file-list="fileList">
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
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
      search: '',
      tableData: [],
      paginationTableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      dialogObj: {
        title: '添加', // 标题
        isShow: false, // 是否显示
        width: '40%',
        height: '70%'
      },
      modalForm: {
        sqmc: '',
        qyl: '',
      },
      rules: {
        sqmc: [{ required: true, message: '请输入社区名称', trigger: ' ' }],
        qyl: [{ required: true, message: '签约率不能为空', trigger: ' ' }],
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
    // 分页方法
    // 页码  每页长度  切割的目标数组
    paginationData(pageNo, pageSize, array) {
      var offset = (pageNo - 1) * pageSize;
      return offset + pageSize >= array.length ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
    },
    // 每页条目变化
    sizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.paginationTableData = this.paginationData(this.pagination.pageNum, pageSize, this.tableData);
      //TODO 查询列表
    },
    // 切换页码
    currentChange(pageNum) {
      this.pagination.pageNum = pageNum;
      this.paginationTableData = this.paginationData(pageNum, this.pagination.pageSize, this.tableData);
      //TODO 查询列表
    },
    // 弹出模态框
    openModal(type, data) {
      console.log(data)
      this.status = type;
      if (type == 'add') {
        this.modalForm = {
        sqmc: '',
        qyl: '',
      };
        this.dialogObj.title = '添加';
      } else {
        this.modalForm = data;
        this.dialogObj.title = '编辑';
      }
      this.dialogObj.isShow = true;
    },
    // 模态框确认
    sureModal() {
      this.$refs.modalForm.validate(valid => {
        console.log(valid)
        if (valid) {
          this.addData();
          this.dialogObj.isShow = false;
        }
      });
    },
    // 删除按钮
    deleteData(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteData(); // 删除接口
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 添加数据
    addData() {
      this.$https
        .post('url', this.modalForm )
        .then(data => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        this.getData();
        })
        .catch(err => {});
    },
    //删除数据
    deleteData() {
      this.$https
        .post('url', { header: JSON.stringify(_self.tableData.header) })
        .then(data => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData();
        })
        .catch(err => {});
    },
    // 获取数据
    getData() {
      console.log(this.search)
/*      this.$https
        .post('url', { header: JSON.stringify(_self.tableData.header) })
        .then(data => {})
        .catch(err => {}); */
      this.tableData = []
      for (var i = 0; i < 100; i++) {
        var obj = {
          sqmc: '花园小区',
          qyl: '12%'
        };
        obj.sqmc = obj.sqmc + i;
        this.tableData.push(obj);
      }
      this.pagination.total = this.tableData.length;
      this.paginationTableData = this.paginationData(this.pagination.pageNum, this.pagination.pageSize, this.tableData);
    },
    //显示隐藏框
    batchImport() {
      this.importModal.isShow = true;
    },
    //上传前
    beforeUpload(file) {
      console.log(file);
    },
    // 上传成功
    handleSuccess() {
      this.getData();
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style></style>
