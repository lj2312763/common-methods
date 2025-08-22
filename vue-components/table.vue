<template>
  <div class="situation-table">
    <div class="flex situation-header">
      <div v-for="(column) in columns" :key="column.field" class="situation-title">{{ column.label }}</div>
    </div>
    <div class="situation-body">
      <transition-group name="slide" tag="div" class="transition-container">
        <div v-for="(row, index) in displayData" :key="getRowKey(row, index)" class="situation-row">
          <div v-for="(column) in columns" :key="`${column.field}-${index}`" class="situation-cell">
            <div v-if="column.multiRow">
              <div v-for="it in column.multiRow" :key="`${it}-${index}`">{{ row[it] }} <br></div>
            </div>
            <div v-else>{{ row[column.field] }}</div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
/**
 * Table 是一个支持自动滚动功能的数据展示表格组件，具有以下主要特性：
   核心功能
     数据展示：通过 columns 和 tableData 属性展示结构化表格数据
     自动滚动：可选的自动滚动功能，定时更新显示最新数据
     动画效果：使用 Vue 的 transition-group 实现平滑的滑入滑出动画
   主要属性 (Props)
     columns: 定义表格列结构的数组，每列包含 field 和 label 属性
     tableData: 表格数据源数组
     autoScroll: 布尔值，控制是否启用自动滚动功能
     scrollInterval: 数值类型，设置自动滚动的时间间隔（毫秒）
     maxRows: 数值类型，控制表格显示的最大行数
   核心机制
     使用 _rowId 为每行数据生成唯一标识符，确保 Vue 列表渲染的稳定性
     自动滚动通过定时器实现，采用先进先出的队列机制更新数据
     结合 CSS transition 实现数据更新时的平滑过渡动画效果
   样式特点
     采用背景图片实现特定视觉效果
     支持 hover 缩放交互效果
     响应式布局，使用 flex 布局实现自适应列宽
 */
export default {
  name: 'Table',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    // 控制是否启用自动滚动
    autoScroll: {
      type: Boolean,
      default: false
    },
    // 滚动间隔（毫秒）
    scrollInterval: {
      type: Number,
      default: 10000
    },
    // 显示的数据条数
    maxRows: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      displayData: [],
      timer: null,
      rowIdCounter: 0
    };
  },
  watch: {
    tableData: {
      handler(newData) {
        // 初始化显示数据
        if (this.displayData.length === 0) {
          this.displayData = newData.slice(0, this.maxRows).map(item => ({
            ...item,
            _rowId: this.generateRowId()
          }));
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    if (this.autoScroll) {
      this.startAutoScroll();
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    getRowKey(row, index) {
      return row._rowId !== undefined ? row._rowId : `row-${index}`;
    },

    generateRowId() {
      return `auto-row-${this.rowIdCounter++}`;
    },

    startAutoScroll() {
      this.timer = setInterval(() => {
        // 添加新数据到末尾
        if (this.tableData.length > this.displayData.length) {
          const nextIndex = this.displayData.length;
          const newItem = {
            ...this.tableData[nextIndex],
            _rowId: this.generateRowId()
          };
          // 删除第一条数据
          this.displayData.shift();

          // 在下一帧执行添加操作，确保动画流畅
          this.$nextTick(() => {
            // 延迟删除以确保动画完成
            setTimeout(() => {
              // 添加新项到显示数据末尾
              this.displayData.push(newItem);
            }, 500); // 与CSS动画时间保持一致
          });
        }
      }, this.scrollInterval);
    }
  }
};
</script>

<style scoped lang="scss">
.situation-table{
  padding: 24px;
  color: #9FC2D3;
}
.situation-header{
  display: flex;
  font-weight: 500;
  font-size: 14px;
  background: url("~@/assets/images/situation/table-header-bg.png") no-repeat left top;
  background-size: 100% 100%;
  height: 31px;
}
.situation-title{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.situation-body {
  overflow: hidden;
}
.transition-container {
  display: block;
}
.situation-row{
  display: flex;
  justify-items: center;
  background: url("~@/assets/images/situation/table-row-bg.png") no-repeat left top;
  background-size: 100% 100%;
  height: 50px;
  margin-top: 12px;
  transition: all 0.5s;
  &:hover{
    transform: scale(1.05);
  }
}
.situation-cell{
  flex: 1;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* 滑动动画 */
.slide-enter-active, .slide-leave-active {
  transition: all 0.5s linear;
}
.slide-enter {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-move {
  transition: transform 0.5s ease;
}
</style>
