<template>
    <div class="text-danger"  v-if="error">{{ error }}</div>
    <div class="row" v-else-if="nodeData">
        <div class="col-3">
          // Popup area
        </div>
        <div class="col-9">
          <svg ref="dataMap" width="600" height="600"></svg>
        </div>
    </div>
</template>
<script setup lang="ts">
    import {onMounted, ref} from 'vue';
    import * as d3 from 'd3';
    import { getData } from '@/services/dataService';
    import type { nodeDataType } from '@/types';

    const defaultNodeData = [{
      data: "A",
      parent: "",
      description: "Root Node"
    }];

    const nodeData = ref<nodeDataType[]>(defaultNodeData);
    const error = ref("");
    const dataMap = ref(null);

    onMounted(async () => {
        try {
          nodeData.value = (await getData()) as nodeDataType[];
        } catch {
          error.value = "Something went wrong";
        }
        drawTree();
    });

    const drawTree = () => {
      const svg = d3.select(dataMap.value);

      // use Stratify to convert data to hierarchy
      const root = d3.stratify()
        .id((d: nodeDataType) => d.data)
        .parentId((d: nodeDataType) => d.parent)(nodeData.value);
      
      const layout = d3.tree().size([600, 400]);
      layout(root);

      const g = svg.append("g")
        .attr("transform", 'translate(0,0)');

      const nodes = g.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d: any) => `translate(${d.y},${d.x})`);

      nodes.append("rect")
      .attr("width", 80)
      .attr("height", 40)
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill", "white")
      .attr("stroke", "#004c4c")  
      .attr("stroke-width", 2);  

      nodes.append("text")
        .attr("dx", 35)
        .attr("dy", 25)
        .text((d: any) => d.data.data);

      // Links
    };
</script>