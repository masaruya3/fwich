function SetButtons(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Action 1</Text>}>
          <TextInput
            label="Name"
            settingsKey="actionName1"
          />
          <TextInput
            label="URL"
            settingsKey="url1"
          />
      </Section>
      <Section
        title={<Text bold align="center">Action 2</Text>}>
          <TextInput
            label="Name"
            settingsKey="actionName2"
          />
          <TextInput
            label="URL"
            settingsKey="url2"
          />
      </Section>
      <Section
        title={<Text bold align="center">Action 3</Text>}>
          <TextInput
            label="Name"
            settingsKey="actionName3"
          />
          <TextInput
            label="URL"
            settingsKey="url3"
          />
      </Section>
    </Page>
  );
}

registerSettingsPage(SetButtons);