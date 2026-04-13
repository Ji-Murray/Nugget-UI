<template>
  <div
    class="ng-steps"
    :class="[`ng-steps--${direction}`]"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="ng-step"
      :class="{
        'ng-step--finished': index < current,
        'ng-step--current': index === current,
      }"
      @click="onStepClick(index)"
    >
      <div class="ng-step__icon-wrapper">
        <div class="ng-step__icon">
          <span v-if="index >= current">{{ index + 1 }}</span>
          <span v-else>✓</span>
        </div>
        <div v-if="index !== items.length - 1" class="ng-step__line"></div>
      </div>
      <div class="ng-step__content">
        <div class="ng-step__title">
          {{ item.title }}
        </div>
        <div v-if="item.description" class="ng-step__description">
          {{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'NgSteps' });

const emit = defineEmits(['update:current', 'change']);

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  current: {
    type: Number,
    default: 0,
  },
  direction: {
    type: String,
    default: 'horizontal',
    validator: (val) => ['horizontal', 'vertical'].includes(val),
  },
  clickable: {
    type: Boolean,
    default: true,
  },
});

const onStepClick = (index) => {
  if (!props.clickable) return;
  emit('update:current', index);
  emit('change', index);
};
</script>

<style scoped>
.ng-steps {
  display: flex;
  gap: 16px;
}

.ng-steps--vertical {
  flex-direction: column;
}

.ng-step {
  display: flex;
  align-items: flex-start;
  color: #d9d9d9;
  font-size: 13px;
  cursor: pointer;
}

.ng-step__icon-wrapper {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.ng-step__icon {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  background: radial-gradient(circle at 30% 20%, #ffd666, #ad6800);
  color: #050509;
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.6);
}

.ng-step__line {
  flex: 1;
  height: 2px;
  margin-left: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.4), transparent);
}

.ng-steps--vertical .ng-step__line {
  width: 2px;
  height: 26px;
  margin: 6px 0 0 12px;
  background: linear-gradient(180deg, rgba(255, 215, 0, 0.4), transparent);
}

.ng-step__content {
  min-width: 120px;
}

.ng-step__title {
  font-size: 14px;
  margin-bottom: 4px;
}

.ng-step__description {
  font-size: 12px;
  color: #a6a6a6;
}

.ng-step--finished .ng-step__icon {
  background: radial-gradient(circle at 30% 20%, #73d13d, #237804);
  color: #fff;
}

.ng-step--current .ng-step__icon {
  box-shadow: 0 0 18px rgba(255, 215, 0, 0.9);
}

.ng-step--current .ng-step__title {
  color: #fff7e6;
}
</style>

