<script>
  import { onMount } from "svelte";
  import { fetchRates } from "api";
  import { format } from "date-fns";
  import { BIRO_SCHEME } from "constants";
  import { rates, ownerData } from "store";
  import { idbCreate, idbAdd, idbRead, idbUpdate } from "utils";

  let typingTimeout = null;

  function handleInputChange() {
    window.clearTimeout(typingTimeout);
    $ownerData = $ownerData;
    typingTimeout = window.setTimeout(function() {
      idbUpdate("biro_db", "owner", 1, $ownerData)
        .then(() => idbRead("biro_db", "owner", 1))
        .then(async result => {
          console.log("store", result);
          ownerData.update(() => result);
          const response = await fetchRates(
            format($ownerData.issue_date, "YYYY-MM-DD"),
            $ownerData.base_currency
          );
          rates.set(response.data.rates);
        });
    }, 500);
  }
</script>

<style>
  label {
    display: block;
    font-weight: 700;
    color: white;
    margin-bottom: 5px;
  }
</style>

<form>
  <div class="field">
    <label>Issue date:</label>
    <input
      type="date"
      bind:value={$ownerData.issue_date}
      on:keyup={() => handleInputChange()}
      on:change={() => handleInputChange()}
      placeholder="Issue date" />
  </div>
</form>
