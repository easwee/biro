<script>
  import { ownerData } from "store";
</script>

<style>
  address {
    width: 50%;
    float: right;
    padding: 0 10px;
    margin-bottom: 15px;
    font-style: normal;
  }
</style>

<address>
  {$ownerData.company_name}
  <br />
  {$ownerData.company_address}
  <br />
  {$ownerData.company_postal_number} {$ownerData.company_city}
  <br />
  Tax reg. no.: {$ownerData.company_tax_registration_number}
  <br />
  Business reg. no.: {$ownerData.company_business_registration_number}
</address>
