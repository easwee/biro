<script>
  import { properties } from "store";

  function handleSetPropertyVisible(key, value) {
    properties.update(object => {
      if (object[object.key]) {
        object[object.key] = value;
      }
      return object;
    });
  }
</script>

<h2>Invoice row columns</h2>
{#each Object.values($properties) as property, index}
  <div>
    <label>
      <input
        type="checkbox"
        bind:checked={property.show}
        on:change={() => handleSetPropertyVisible(property.name, property.show)} />
      {property.name}
    </label>
  </div>
{/each}
