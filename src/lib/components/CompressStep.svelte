<script>
  export let step = 'step1'
</script>

<ul class="steps hidden lg:steps-horizontal">
  <li
    id="step1"
    class="step {step === 'step1' ? 'step-primary' : 'step-neutral'}"
  >
    Pick Compress Type
  </li>
  <li
    id="step2"
    class="step {step === 'step2' ? 'step-primary' : 'step-neutral'}"
  >
    Input File
  </li>
  <li
    id="step3"
    class="step {step === 'step3' ? 'step-primary' : 'step-neutral'}"
  >
    Receive File
  </li>
</ul>
