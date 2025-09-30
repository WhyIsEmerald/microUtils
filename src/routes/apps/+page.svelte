<script lang="ts">
  import Card from '$lib/components/AppCard.svelte'
</script>

<div
  class="motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md overflow-hidden"
>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-12">
    <a href="/apps/bmi">
      <Card
        badgeType="health"
        cardTitle="BMI calculator"
        cardDescription="calculates BMI"
      />
    </a>
    <a href="/apps/note">
      <Card
        badgeType="utility"
        cardTitle="Note"
        cardDescription="Write and save notes"
      />
    </a>
    <a href="/apps/currency">
      <Card
        badgeType="finance"
        cardTitle="Currency Converter"
        cardDescription="Converts currencies"
      />
    </a>
    <a href="/apps/compress">
      <Card
        badgeType="utility"
        cardTitle="File Compressor"
        cardDescription="Compress and decompress files"
      />
    </a>
    <a href="/apps/encrypt">
      <Card
        badgeType="utility"
        cardTitle="File Encryptor"
        cardDescription="Encrypt and decrypt files"
      />
    </a>

    <a href="/apps/calculator">
      <Card
        badgeType="math"
        cardTitle="Calculator"
        cardDescription="Simple calculator"
      />
    </a>
    <a href="/apps/clickspeed">
      <Card
        badgeType="utility"
        cardTitle="Click Speed Test"
        cardDescription="Test your clicking speed"
      />
    </a>
    <a href="/apps/randomize">
      <Card
        badgeType="utility"
        cardTitle="Randomizer"
        cardDescription="Randomize numbers"
      />
    </a>
    <a href="/apps/colorpicker">
      <Card
        badgeType="utility"
        cardTitle="Color Picker"
        cardDescription="Pick a color"
      />
    </a>
    <a href="/apps/todo">
      <Card
        badgeType="utility"
        cardTitle="Todo"
        cardDescription="Manage your tasks"
      />
    </a>
    <a href="/apps/password">
      <Card
        badgeType="utility"
        cardTitle="Password Generator"
        cardDescription="Generate a password"
      />
    </a>
  </div>
</div>
