/** * @Description: 小程序-家医服务信息列表 * @author GyYU * @Date 2021-6-13 09:53:09 */
<template>
  <div>
    <el-card style="min-height: 870px;">
      <el-row>
        <el-col :span="20">
          <div>小程序-家医服务信息列表</div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" @click="openModal('add', '')">添加</el-button>
          <el-button type="primary" size="mini" @click="batchImport()">批量</el-button>
        </el-col>
      </el-row>
      <hr />
      <el-row style="margin:35px 0px">
        <el-col :span="22">
          <el-input placeholder="筛查项目" prefix-icon="el-icon-search" v-model="search"></el-input>
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
          <el-table-column prop="scxm" label="筛查项目" min-width="150" align="center">
            <template slot-scope="scope">
              <template v-for="(item,index) in scope.row.scxm">
                <span>{{item}}</span><span v-if="index != scope.row.scxm.length-1">&nbsp;|&nbsp;</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="ssyymc" label="所属医院名称" min-width="150" align="center"></el-table-column>
          <el-table-column prop="ssyylx" label="所属医院类型" min-width="150" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.ssyylx==1">一甲</span>
              <span v-if="scope.row.ssyylx==2">二甲</span>
              <span v-if="scope.row.ssyylx==3">三甲</span>
            </template>
          </el-table-column>
          <el-table-column prop="yyyzs" label="已预约/总数" min-width="150" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.yyy}}/{{scope.row.zs}}</span>
            </template>
          </el-table-column>
          <el-table-column label="预约详情" min-width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="openDetailModal(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
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
      <el-form ref="modalForm" :model="modalForm" :rules="rules" label-width="140px">
        <el-form-item label="筛查项目" prop="scxm">
          <el-row>
            <el-col :span="19">
              <el-checkbox-group v-model="modalForm.scxm">
                <template v-for="item in scxmArr">
                  <el-checkbox :label="item" name="scxm"></el-checkbox>
                </template>
              </el-checkbox-group>
            </el-col>
            <el-col :span="5" v-if="dialogObj.title == '添加'">
              <el-button type="primary" size="mini" @click="addSCItem" style="float:right">添加筛查项目</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="所属医院名称" prop="ssyymc">
          <el-input v-model="modalForm.ssyymc"></el-input>
        </el-form-item>
        <el-form-item label="所属医院类型" prop="ssyylx">
          <el-select v-model="modalForm.ssyylx" placeholder="所属医院类型">
            <el-option label="一甲" value="1"></el-option>
            <el-option label="二甲" value="2"></el-option>
            <el-option label="三甲" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约总数" prop="yyyzs">
          <el-input v-model="modalForm.yyyzs"></el-input>
        </el-form-item>
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
    <modal :modalObj="detailsModal">
      <el-row style="margin:35px 0px">
        <el-col :span="22">
          <el-input placeholder="姓名/所在社区/性别" prefix-icon="el-icon-search" v-model="searchDetalis"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" style="float:right" @click="getDetalisData">查询</el-button>
        </el-col>
      </el-row>
      <el-table :data="paginationDetailsTableData" border height="450px" width="100%" size="small">
        <el-table-column prop="id" label="序号" width="80" align="center">
          <template slot-scope="scope">
            {{ (detailsDagination.pageNum - 1) * detailsDagination.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" min-width="150" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" min-width="150" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.sex==1">男</span>
            <span v-if="scope.row.sex==2">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" min-width="150" align="center"></el-table-column>
        </el-table-column>
        <el-table-column prop="yysj" label="预约时间" min-width="150" align="center"></el-table-column>
        <el-table-column prop="szsq" label="所在社区" min-width="150" align="center"></el-table-column>
      </el-table>
      <div class="block" style="margin-top: 10px;text-align: center">
        <el-pagination @size-change="detailsSizeChange" @current-change="detailsCurrentChange" :current-page="detailsDagination.pageNum" :page-sizes="[10, 30, 50]" :page-size="detailsDagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="detailsDableData.length" style="margin-top: 10px"></el-pagination>
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
      scxmArr: ['内科', '外科', '妇科', '血糖', '血脂', '血压'],
      search: '',
      searchDetalis: '',
      tableData: [],
      detailsDableData: [],
      paginationTableData: [],
      paginationDetailsTableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      detailsDagination: {
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
      detailsModal: {
        title: '详细信息', // 标题
        isShow: false, // 是否显示
        width: '60%',
        height: '50%'
      },
      modalForm: {
        scxm: [],
        ssyymc: '',
        ssyylx: '',
        yyyzs: '',
      },
      rules: {
        scxm: [{ required: true, message: '筛查项目不能为空', trigger: ' ' }],
        ssyymc: [{ required: true, message: '所属医院名称不能为空', trigger: ' ' }],
        ssyylx: [{ required: true, message: '所属医院类型不能为空', trigger: ' ' }],
        yyyzs: [{ required: true, message: '预约总数不能为空', trigger: ' ' }],
      },
      importModal: {
        title: '批量上传', // 标题
        isShow: false, // 是否显示
        width: '30%',
        height: '40%'
      },
      fileList: [],
      checkData: {}
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
    detailsSizeChange(pageSize) {
      this.detailsDagination.pageSize = pageSize;
      this.paginationDetailsTableData = this.paginationData(this.detailsDagination.pageNum, pageSize, this.detailsDableData);
      //TODO 查询列表
    },
    // 切换页码
    detailsCurrentChange(pageNum) {
      this.detailsDagination.pageNum = pageNum;
      this.paginationDetailsTableData = this.paginationData(pageNum, this.detailsDagination.pageSize, this.detailsDableData);
      //TODO 查询列表
    },
    // 详情页弹出
    openDetailModal(data) {
      // 先用假的
      console.log(data)
      this.detailsDagination = { // 每次重置一下分页设置
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
      this.detailsModal.isShow = true
      this.getDetalisData(data)

    },
    getDetalisData() {
      console.log(this.searchDetalis) // 查询条件
      for (var i = 0; i < 100; i++) {
        var obj = {
          xm: '套餐名称',
          name: '王老五',
          sex: '1',
          age: '52',
          yysj: '2020-01-01',
          szsq: '幸福社区'
        };
        obj.name = obj.name + i;
        this.detailsDableData.push(obj);
      }
      this.detailsDagination.total = this.detailsDableData.length;
      this.paginationDetailsTableData = this.paginationData(this.detailsDagination.pageNum, this.detailsDagination.pageSize, this.detailsDableData);
      return false
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
    // 弹出模态框
    openModal(type, data) {
      console.log(data)
      this.checkData = data
      this.status = type;
      if (type == 'add') {
        this.modalForm = {
          scxm: [],
          ssyymc: '',
          ssyylx: '',
          yyyzs: '',
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
      console.log(this.modalForm)
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
        .post('url', { header: JSON.stringify(_self.tableData.header) })
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
          scxm: ['内科', '外科'],
          ssyymc: '12',
          ssyylx: '1',
          yyy: '13',
          zs: "100"
        };
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
    addSCItem(
    ) {
      this.$router.push({
        path: "/screeningItems"
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style>
.el-select {
  width: 100%;
}
</style>
