<script setup>
	import { computed, ref } from 'vue'
	import { useRoute } from 'vue-router';
	const route = useRoute()
</script>

<template>
    <el-scrollbar class="scrollbar" style="">
		<el-menu :router=true style="border-right:none;">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><i-ep-message /></el-icon>Navigator One
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="/console">首页</el-menu-item>
              <el-menu-item index="/console/servers">服务</el-menu-item>
              <el-menu-item index="/console/links">链路</el-menu-item>
              <el-menu-item index="/console/users">用户管理</el-menu-item>
              <el-menu-item index="/console/files">文件</el-menu-item>
              <el-menu-item index="/console/setting">设置</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>Option4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><i-ep-menu /></el-icon>Navigator Two
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><i-ep-setting /></el-icon>Navigator Three
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
	</el-scrollbar>
</template>

<style scoped>
.scrollbar {
	border-right: solid 1px #e6e6e6;
}

</style>

