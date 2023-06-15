import { CustomComponent } from './custom-component';

export class ComponentRegistry {
    static templates: { [name: string]: HTMLTemplateElement } = {};

    static createRegistry() {
        return new ComponentRegistry();
    }

    public register(...components: (typeof CustomComponent)[]) {
        components.forEach(component => {
            const name = component.elementName;
            const templates = ComponentRegistry.templates;

            if (name in templates) return;

            component.setDefaultTokens();

            const template = document.createElement('template');
            template.innerHTML = `<style>${component.styles ?? ''}</style>`;
            templates[name] = template;

            customElements.define(name, component);
        });
    }
}
