<template>
  <div>
    <el-card style="min-height: 870px;">
      <el-row>
        <el-col :span="20">
          <div>小程序-义诊预约信息列表</div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" @click="roster()">排班</el-button>
          <el-button type="primary" size="mini" @click="openModal('add', '')">添加</el-button>
          <el-button type="primary" size="mini" @click="batchImport()">批量</el-button>
        </el-col>
      </el-row>
      <hr />
      <el-row style="margin:35px 0px">
        <el-col :span="22">
          <el-input placeholder="姓名/职称/所属医院/医院类型/擅长/坐诊日期" prefix-icon="el-icon-search" v-model="search"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" style="float:right" @click="getData">查询</el-button>
        </el-col>
      </el-row>
      <div>
        <el-table :data="paginationTableData" border height="611px" width="100%" size="small">
          <el-table-column prop="id" label="序号" width="80" align="center">
            <template slot-scope="scope">
              {{ (pagination.pageNum - 1) * pagination.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="xm" label="姓名" min-width="150" align="center"></el-table-column>
          <el-table-column prop="zc" label="职称" min-width="150" align="center"></el-table-column>
          <el-table-column prop="ssyy" label="所属医院" min-width="150" align="center"></el-table-column>
          <el-table-column prop="ssyylx" label="所属医院类型" min-width="150" align="center"></el-table-column>
          <el-table-column prop="sc" label="擅长" min-width="150" align="center"></el-table-column>
          <el-table-column prop="zzrq" label="坐诊日期" min-width="150" align="center"></el-table-column>
          <el-table-column label="操作" min-width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="openModal('edit', scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteData(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block" style="margin-top: 10px;text-align: center">
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="pagination.pageNum" :page-sizes="[10, 30, 50]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" style="margin-top: 10px"></el-pagination>
      </div>
    </el-card>
    <modal :modalObj="dialogObj">
      <el-row :gutter="20">
        <el-col :span="14">
          <el-form ref="modalForm" :model="modalForm" :rules="rules" label-width="120px">
            <el-form-item label="姓名" prop="xm">
              <el-input v-model="modalForm.xm"></el-input>
            </el-form-item>
            <el-form-item label="职称" prop="zc">
              <el-input v-model="modalForm.zc"></el-input>
            </el-form-item>
            <el-form-item label="所属医院" prop="ssyy">
              <el-input v-model="modalForm.ssyy"></el-input>
            </el-form-item>
            <el-form-item label="所属医院类型" prop="ssyylx">
              <el-input v-model="modalForm.ssyylx"></el-input>
            </el-form-item>
            <el-form-item label="擅长" prop="sc">
              <el-input type="textarea" v-model="modalForm.sc"></el-input>
            </el-form-item>
            <el-form-item label="坐诊日期" prop="zzrq">
              <el-input v-model="modalForm.zzrq"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
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
    <modal :modalObj="rosterModal">
      <el-table :data="rosterData" style="width: 100%">
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-select v-model="community" placeholder="请选择" size="mini">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            6.1-6.7                     排班
          </template>
        </el-table-column>
      </el-table>
      <div class="divauto" style="text-align: center;">
        <el-button type="primary" size="mini" @click="dialogObj.isShow = false">取消</el-button>
        <el-button type="primary" size="mini" @click="sureModal">确定</el-button>
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
        xm: '',
        zc: '',
        ssyy: '',
        ssyylx: '',
        sc: '',
        zzrq: '',
      },
      rules: {
        xm: [{ required: true, message: '行动名称不能为空', trigger: ' ' }],
        zc: [{ required: true, message: '指标不能为空', trigger: ' ' }],
        ssyy: [{ required: true, message: '指标描述不能为空', trigger: ' ' }],
        ssyylx: [{ required: true, message: '基期水平不能为空', trigger: ' ' }],
        sc: [{ required: true, message: '常营水平不能为空', trigger: ' ' }],
        zzrq: [{ required: true, message: '2020年目标值不能为空', trigger: ' ' }],
      },
      importModal: {
        title: '批量上传', // 标题
        isShow: false, // 是否显示
        width: '30%',
        height: '40%'
      },
      fileList: [],
      checkData: {},
      imageUrl: '',
      rosterModal: {
        title: '排班', // 标题
        isShow: false, // 是否显示
        width: '30%',
        height: '40%'
      },
      options: [{
        value: '选项1',
        label: '第一社区'
      }, {
        value: '选项2',
        label: '第二社区'
      }],
      community: ''
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
      this.checkData = data
      if (type == 'add') {
        this.modalForm = {
          xm: '',
          zc: '',
          ssyy: '',
          ssyylx: '',
          sc: '',
          zzrq: '',
        };
        this.dialogObj.title = '添加';
      } else {
        this.modalForm = this.deepClone(data);
        this.dialogObj.title = '编辑';
      }
      this.dialogObj.isShow = true;
    },
    // 模态框确认
    sureModal() {
      this.$refs.modalForm.validate(valid => {
        console.log(valid)
        if (valid) {
          for (var key in this.checkData) {
            this.checkData[key] = this.modalForm[key]
          }
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
        .post('url', this.modalForm)
        .then(data => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData();
        })
        .catch(err => { });
    },
    //删除数据
    deleteData() {
      this.$https
        .post('url', { header: JSON.stringify(this.tableData.header) })
        .then(data => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData();
        })
        .catch(err => { });
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
          xm: '姓名',
          zc: '职称',
          ssyy: '所属医院',
          ssyylx: '所属医院类型',
          sc: '擅长',
          zzrq: '坐诊日期',
        };
        obj.xm = obj.xm + i;
        obj.zc = obj.zc + i;
        obj.ssyy = obj.ssyy + i;
        obj.ssyylx = obj.ssyylx + i;
        obj.sc = obj.sc + i;
        obj.zzrq = obj.zzrq + i;
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
    },
    deepClone(obj) {
      var _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
      return objClone
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    roster() { this.rosterModal.isShow = true; }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.avatar-uploader {
  border: 1px solid #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 194px;
  height: 259px;
  line-height: 259px;
  text-align: center;
}
.avatar {
  width: 194px;
  height: 259px;
  display: block;
  border: 1px solid #d9d9d9 !important;
}
</style>
