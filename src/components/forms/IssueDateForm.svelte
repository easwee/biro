<script>
  import { onMount } from "svelte";
  import { fetchRates } from "api";
  import { format } from "date-fns";
  import { rates, ownerData } from "store";
  import { idbRead, idbUpdate } from "utils";

  let typingTimeout = null;

  function handleInputChange() {
    window.clearTimeout(typingTimeout);
    $ownerData = $ownerData;
    typingTimeout = window.setTimeout(function() {
      idbUpdate("biro_db", "owner", 1, $ownerData)
        .then(() => idbRead("biro_db", "owner", 1))
        .then(async result => {
          ownerData.set(result);
          if ($ownerData.use_conversion) {
            const response = await fetchRates(
              $ownerData.issue_date,
              $ownerData.base_currency
            );
            console.log(response);
            console.log("=====");
            console.log(response.data.rates);
            console.log("=====");
            console.log(rates, rates.set)
            rates.set(response.data.rates);
          }
        });
    }, 500);
  }
</script>

<form>
  <div class="field">
    <label for="date">Issue date:</label>
    <input
      id="date"
      type="date"
      bind:value={$ownerData.issue_date}
      on:keyup={() => handleInputChange()}
      on:change={() => handleInputChange()}
      placeholder="Issue date" />
  </div>
  <div class="field">
    <label for="invoice_no">Invoice No.</label>
    <input
      id="invoice_no"
      type="text"
      bind:value={$ownerData.invoice_number}
      on:keyup={handleInputChange}
      on:change={handleInputChange}
      placeholder="Invoice number" />
  </div>
</form>
